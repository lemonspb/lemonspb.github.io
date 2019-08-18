const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const  CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
      },
    
    { 
      test: /\.(jpg|jpeg|png)$/,
      use: [
             {
               loader: "file-loader",
               options: {
                name: 'img/[contenthash].[ext]',
                useRelativePath: true
                        }
             }
           ]
    }
    ]
  },
  plugins: [ 
    new ExtractTextPlugin(
      {filename: 'style.css'}
    ),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {from:'src/img',to:'img'} 
  ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
  })
  ]
};