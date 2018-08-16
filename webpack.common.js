const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode is now specified in webpack.dev.js and webpack.prod.js
  // mode: 'production',
  // mode: 'development',
  entry: {
    // No need to generate these bundles because we are dynamically importing them in slycat-model-main.js,
    // which in turn creates the bundles from there.
    // ui_parameter_image: './web-server/plugins/slycat-parameter-image/js/ui.js',
    // ui_timeseries:      './web-server/plugins/slycat-timeseries-model/js/ui.js',
    // ui_cca:             './web-server/plugins/slycat-cca/js/ui.js',
    // ui_parameter_plus:  './web-server/plugins/slycat-parameter-image-plus-model/js/ui.js',
    ui_run_command:     './web-server/plugins/slycat-run-command/ui.js',
    slycat_projects:    './web-server/js/slycat-projects-main.js',
    slycat_project:     './web-server/js/slycat-project-main.js',
    slycat_page:        './web-server/js/slycat-page-main.js',
    slycat_model:       './web-server/js/slycat-model-main.js',
    slycat_login:       './web-server/slycat-login-react/src/index.js',
  },
  output: {
    // Use this to add the chunk hash into the filename. Great for caching, but can't
    // find a way to make it work with dynamic model code imports yet.
    // filename: '[name].[chunkhash].js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'web-server/dist'),
    // Public URL of js bundle files. We want them available at the root URL.
    publicPath: '/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    // These next few HtmlWebpackPlugin blocks inject all the chunks for a particular entry point 
    // into the template for that model. The chunks are generated by the splitChunks optimization.
    // new HtmlWebpackPlugin({
    //   template: 'web-server/plugins/slycat-parameter-image/ui.html',
    //   filename: 'ui_parameter_image.html',
    //   chunks: ['ui_parameter_image'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: 'web-server/plugins/slycat-timeseries-model/ui.html',
    //   filename: 'ui_timeseries.html',
    //   chunks: ['ui_timeseries'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: 'web-server/plugins/slycat-cca/ui.html',
    //   filename: 'ui_cca.html',
    //   chunks: ['ui_cca'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: 'web-server/plugins/slycat-parameter-image-plus-model/ui.html',
    //   filename: 'ui_parameter_plus.html',
    //   chunks: ['ui_parameter_plus'],
    // }),
    new HtmlWebpackPlugin({
      template: 'web-server/plugins/slycat-run-command/ui.html',
      filename: 'ui_run_command.html',
      chunks: ['ui_run_command'],
    }),
    new HtmlWebpackPlugin({
      template: 'web-server/templates/slycat-projects.html',
      filename: 'slycat_projects.html',
      chunks: ['slycat_projects'],
    }),
    new HtmlWebpackPlugin({
      template: 'web-server/templates/slycat-project.html',
      filename: 'slycat_project.html',
      chunks: ['slycat_project'],
    }),
    new HtmlWebpackPlugin({
      template: 'web-server/templates/slycat-page.html',
      filename: 'slycat_page.html',
      chunks: ['slycat_page'],
    }),
    new HtmlWebpackPlugin({
      template: 'web-server/templates/slycat-model-page.html',
      filename: 'slycat_model.html',
      chunks: ['slycat_model'],
    }),
    new HtmlWebpackPlugin({
      template: 'web-server/slycat-login-react/public/index.html',
      filename: 'slycat_login.html',
      chunks: ['slycat_login'],
    }),
  ],
  module: {
    rules: [
      // This enables Babel
      { test: /\.js$/, 
        exclude: /node_modules/, 
        use: "babel-loader",
      },
      // This enables the html-loader, needed to load knockout .html templates
      { test: /\.html$/, 
        use: 'html-loader' 
      },
      // This enables the style and css loaders, which are needed to load CSS files
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      // This enabled the URL loader for loading images referenced in CSS files as url()
      {
        test: /\.(png|jpg|gif|jp(e*)g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // If the file is greater than the limit (in bytes) the file-loader is used by default and all query parameters are passed to it.
              limit: 8192,
              name: '[name].[ext]',
              // Public URL of image files. We want them available at the root URL.
              publicPath: '/',
            }
          }
        ]
      },
      // This enabled the URL loader for loading fonts, with an automatic fallback to the file-loader for fonts larger than the set limit.
      { 
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: '[name].[ext]',
              // Public URL of font files. We want them available at the root URL.
              publicPath: '/',
            }
          }
        ]
      },
      // This enables compiling Less to CSS
      {
        test: /\.less$/,
        use: [ 
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'less-loader' // compiles Less to CSS
        ]
      },
    ],
  },
  optimization: {
    splitChunks: {
      // Disabling chunking everything because I can't get it to work with dynamic imports for model code.
      // 'all' creates lots of chunks but does not automatically load them. Using HtmlWebpackPlugin to inject them into templates.
      // chunks: 'all',
      // Chunking only non-model bundles
      chunks (chunk) {
        // exclude `model chunks`
        var exclude = ['ui_parameter_image', 'ui_timeseries', 'ui_cca', 'ui_parameter_plus', ];
        return exclude.indexOf(chunk.name) < 0;
      },
      // chunks: 'async',
    },
  },
  // This configures webpack to look in the web-server directory for modules, after it looked in node_modules
  resolve: {
    modules: [
      "node_modules", 
      path.resolve(__dirname, "web-server"),
    ],
  },
};