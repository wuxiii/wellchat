# vue-seed

> A Vue.js project

## Plugin
``` bash
Beautify
rc-beautify
EditorConfig for VS Code
ESLint
Prettier
Vetur
```

## VS Code config
``` bash
{
  "explorer.confirmDelete": false,
  "eslint.validate": ["javascript", "javascriptreact", "html", "vue"],
  "eslint.options": {
    "plugins": ["html"]
  },
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  },
  "vetur.validation.template": false,
  "prettier.singleQuote": true,
  "prettier.semi": false,
  "beautify.language": {
    "js": {
      "type": ["javascript", "json"],
      "filename": [".jshintrc", ".jsbeautify"]
    },
    "css": ["css", "scss"],
    "html": ["htm", "html", "vue"]
  }
}

```

## VS Code keyboard config
``` bash
[
  {
    "key": "cmd+b",
    "command": "HookyQR.beautify",
    "when": "editorFocus"
  }
]
```