const path = require('path')

module.exports = {
  entry: {
    'main': './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 9000,
    open: true,
    openPage: 'src/',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'createElement'}]]
          }
        }
      },
    ],
  },
}