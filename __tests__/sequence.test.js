

import { beforeEach, expect, test } from "@jest/globals";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ---------- resolve dirname in ESM ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* ---------- load raw HTML ---------- */
const html = fs.readFileSync(
	path.join(__dirname, "../sequence.html"),
	"utf8",
);

let document;