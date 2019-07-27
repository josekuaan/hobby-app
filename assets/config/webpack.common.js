var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
 var path = require('path');
const react = require('react')
// const VENDOR_LIBS = ['react', 'react-dom'];
module.exports = {
  entry: {
    
    bundle: './assets/src/index.js',
    // vendor: VENDOR_LIBS
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
module: {
    rules: [
      {
        test: /\.js$/,
        loader:  'babel-loader',
        query: {
            presets: ['es2015']
        },
          
        include: [
          path.resolve(__dirname, "src")
        ],
        
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
   
new HtmlWebpackPlugin({
      template: 'assets/src/index.html'
    })
  ]
};