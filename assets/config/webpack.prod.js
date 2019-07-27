var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpackMerge = require('webpack-merge');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
var commonConfig = require('./webpack.common.js');
const path = require('path');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
module.exports = webpackMerge(commonConfig, {
    
    mode:'production',
  
output: {
    path: path.join(__dirname, '/.tmp/public'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
//   optimization: {
//     minimizer: [
//       // we specify a custom UglifyJsPlugin here to get source maps in production
//       new UglifyJsPlugin({
//         cache: true,
//         parallel: true,
//         uglifyOptions: {
//           compress: false,
//           ecma: 6,
//           mangle: true
//         },
//         sourceMap: true
//       })
//     ]
//   },
plugins: [
    new UglifyJsPlugin({
        uglifyOptions: {
        warnings: false,
        ie8: false,
        output: {
        comments: false
        }
        }
        }),
    new webpack.NoEmitOnErrorsPlugin(),
    
       
        
    new ExtractCssChunks('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
  ]
})