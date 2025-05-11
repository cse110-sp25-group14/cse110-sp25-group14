import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
   
	{
		rules: {
			"no-unused-vars": "error",
			"no-undef": "error",
			"semi": "error"

		},
	},
]);