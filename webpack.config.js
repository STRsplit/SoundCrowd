var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['./main.jsx'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  externals: {
    jQuery: 'jQuery',
    foundation: 'Foundation'
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }, 
      {
        test: /\.less$/,
        use: [
          {
           loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "less-loader", options: {
              paths: [
                  path.resolve(__dirname, "node_modules"),
                  path.resolve(__dirname, "styles/sass")
              ]
            }
          }
        ]
      },
      { 
        test: /\.scss$/,
         use: [
           {
            loader: "style-loader"
           }, {
             loader: "css-loader"
           }, {
             loader: "sass-loader", options: {
               paths: [
                   path.resolve(__dirname, "node_modules"),
                   path.resolve(__dirname, "styles/sass")
               ]
             }
           }
         ]
       },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
        }
    ],
  },
    resolve: {
      modules: [
        path.join(__dirname, 'node_modules'),
      ],
    },
};