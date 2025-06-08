import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: { 
			js, 
			"@stylistic": stylistic, 
		},
		extends: ["js/recommended"],
		languageOptions: {
			globals: {
				...globals.browser,	
				...globals.jest,
				page: "readonly"			
			}
		},
		rules: {
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/quotes": ["error", "double", { "allowTemplateLiterals": true }],
			"@stylistic/semi": ["error"],
		},
	},
]);
