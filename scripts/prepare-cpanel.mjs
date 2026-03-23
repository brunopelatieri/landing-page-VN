import { mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(".");
const distApi = resolve(root, "dist", "api");
const srcPhp = resolve(root, "backend", "php", "meta-conversion.php");
const srcConfigExample = resolve(root, "backend", "php", "config.php.example");
const srcApiHtaccess = resolve(root, "backend", "php", ".htaccess");
const outPhp = resolve(distApi, "meta-conversion.php");
const outConfigExample = resolve(distApi, "config.php.example");
const outApiHtaccess = resolve(distApi, ".htaccess");

await mkdir(distApi, { recursive: true });
await copyFile(srcPhp, outPhp);
await copyFile(srcConfigExample, outConfigExample);
await copyFile(srcApiHtaccess, outApiHtaccess);

console.log("cPanel package ready: dist/ + dist/api (PHP endpoint secured)");
