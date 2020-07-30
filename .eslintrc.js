module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "rules": {
    "semi": 0,
    "no-unused-vars": [
      "error",
      {
        "args": "none",
        "varsIgnorePattern": "[get|set]PathData"
      }
    ],
    "space-before-function-paren": 0,
    "no-control-regex": 0,
    "no-useless-escape": 0,
    "space-before-blocks": 0,
    "spaced-comment": 0,
    "keyword-spacing": 0,
    "no-tabs": 0,
    "no-debugger": 0,
    "space-infix-ops": 0,
    "key-spacing": 0,
    "no-console": 0,
    "space-before-function-paren": 0,
    "vue/no-debugger": 0,
    "vue/attributes-order": 0,
    "vue/require-v-for-key": 0,
    "vue/no-unused-components": 0,
    "vue/max-attributes-per-line": 0,
    "vue/html-indent": 0,
    "vue/attribute-hyphenation": 0,
    "operator-linebreak": 0,
    "no-ids": 0,
  }
}
