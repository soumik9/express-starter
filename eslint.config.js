import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  languageOptions: {
    globals: globals.browser,  // Setting browser globals
  },
  ...pluginJs.configs.recommended,
  rules: {
    'no-unused-vars': 'warn',  // Turn off the no-unused-vars rule
  },
};