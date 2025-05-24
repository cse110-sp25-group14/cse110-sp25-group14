import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"], languageOptions: {globals: {...globals.browser,},},},
   
	{
		rules: {
			"no-unused-vars": "error",
			"no-undef": "error",
			"semi": "error"

		},
	},
]);
