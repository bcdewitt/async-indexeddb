module.exports = {
  "root": true,
  "extends": "standard",
  "env": {
    "browser": true
  },
  "rules": {
    "comma-dangle": ["error", "always-multiline"],

    // More permissive spacing (Easier for code to follow gestalt principle of proximity)
    "padded-blocks": "off",

    // Function def and function call are consistent this way
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }]
  }
}
