export default {
  semi: false,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none',
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '.*rc',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ]
}
