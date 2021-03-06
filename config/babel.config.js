module.exports = {
  presets: [
    [
      require.resolve('babel-preset-env'), 
      {
        targets: { browsers: '> 5%' }
      }
    ],
    require.resolve('babel-preset-react-app')
  ],
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-object-assign')
  ]
}