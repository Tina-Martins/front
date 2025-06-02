// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-unused-vars': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'at-rule-no-unknown': 'off',
    'no-explicit-any': 'off',
  },
})
