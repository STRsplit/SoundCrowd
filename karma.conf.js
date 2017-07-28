const webpack = require('webpack');
const path = require('path')


const webpackConfig = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js$/],
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          presets: ['react', 'es2015', 'stage-3']        
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' }
    ]
  },
  node: {
    fs: 'empty'
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react-addons-test-utils': 'react-dom',
  },
};

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'jasmine', 'requirejs'],
    files: [
      'test/root.js',
      'node_modules/babel-polyfill/dist/polyfill.js'
    ],


    // list of files to exclude
    exclude: [ ],
  

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.jsx': ['webpack', 'sourcemap', 'react-jsx'],
      'test/*.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan'],
    nyanReporter: {
      suppressErrorHighlighting: true,
    },
    browserConsoleLogOptions: {
      level: 'log',
      terminal: true
    },

    client: {
      captureConsole: false
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
