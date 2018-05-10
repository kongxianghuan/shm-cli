module.exports = {
  presets: [
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-object-assign')
  ]
}