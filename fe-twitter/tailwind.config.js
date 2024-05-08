/* eslint-disable @typescript-eslint/no-var-requires */
const plugins = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  corePlugins: {
    container: false // Xóa class container của tailwind
  },
  plugins: [
    plugins(function ({ addComponents, theme }) {
      // Tạo tại class container mới
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
