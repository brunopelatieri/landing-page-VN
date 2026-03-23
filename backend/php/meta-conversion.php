<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

$raw = file_get_contents("php://input");
$body = json_decode($raw, true);
if (!is_array($body)) {
    $body = [];
}

$config = [];
$configPath = __DIR__ . "/config.php";
if (file_exists($configPath)) {
    $loaded = include $configPath;
    if (is_array($loaded)) {
        $config = $loaded;
    }
}

$token = getenv("META_CAPI_TOKEN") ?: ($config["META_CAPI_TOKEN"] ?? null);
$pixelEnv = getenv("META_PIXEL_ID") ?: ($config["META_PIXEL_ID"] ?? null);
$pixelId = isset($body["pixelId"]) ? $body["pixelId"] : ($pixelEnv ? $pixelEnv : "933858032944864");

if (!$token) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "META_CAPI_TOKEN is not configured"]);
    exit;
}

function norm_digits($v) {
    return preg_replace("/\D+/", "", (string)$v);
}
function norm_email($v) {
    return strtolower(trim((string)$v));
}
function norm_name($v) {
    return strtolower(trim((string)$v));
}
function sha256_hex($v) {
    return hash("sha256", $v);
}

$nome = isset($body["nome"]) ? (string)$body["nome"] : "";
$nomeParts = preg_split("/\s+/", trim($nome));
$firstName = count($nomeParts) > 0 ? $nomeParts[0] : "";
$lastName = count($nomeParts) > 1 ? implode(" ", array_slice($nomeParts, 1)) : "";

$em = norm_email($body["email"] ?? "");
$ph = norm_digits($body["celular"] ?? ($body["telefone"] ?? ""));
$external = norm_digits($body["cpf"] ?? ($body["celular"] ?? ""));

$userData = [
    "client_user_agent" => $_SERVER["HTTP_USER_AGENT"] ?? null,
    "fbp" => $body["fbp"] ?? null,
    "fbc" => $body["fbc"] ?? null,
];

if ($em !== "") {
    $userData["em"] = [sha256_hex($em)];
}
if ($ph !== "") {
    $userData["ph"] = [sha256_hex($ph)];
}
if ($firstName !== "") {
    $userData["fn"] = [sha256_hex(norm_name($firstName))];
}
if ($lastName !== "") {
    $userData["ln"] = [sha256_hex(norm_name($lastName))];
}
if ($external !== "") {
    $userData["external_id"] = [sha256_hex($external)];
}

$payload = [
    "data" => [[
        "event_name" => $body["event_name"] ?? "Lead",
        "event_time" => time(),
        "event_id" => $body["event_id"] ?? null,
        "action_source" => "website",
        "event_source_url" => $body["page_url"] ?? null,
        "user_data" => $userData
    ]]
];

$url = "https://graph.facebook.com/v20.0/" . urlencode($pixelId) . "/events?access_token=" . urlencode($token);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$result = curl_exec($ch);
$curlErr = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($curlErr) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => $curlErr]);
    exit;
}

$decoded = json_decode($result, true);
if (!is_array($decoded)) {
    $decoded = ["raw" => $result];
}

if ($httpCode < 200 || $httpCode >= 300) {
    http_response_code($httpCode ?: 500);
    echo json_encode(["ok" => false, "error" => $decoded]);
    exit;
}

echo json_encode(["ok" => true, "data" => $decoded]);

