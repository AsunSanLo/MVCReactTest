'use strict';

const basePath = '/ReactApp/ts-sample-widget/build/';
const defaultConfig = require('./webpack.config.default.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = mode => {

  //Loads default CRA webpack configuration
  const config = defaultConfig(mode);


  //Config to generate the bundled css without hash
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'static/css/[name].css',
    chunkFilename: 'static/css/[name].chunk.css',
    ignoreOrder: false,
  }));

  //Config to generate the bundled js without hash
  config.output.chunkFilename = "static/js/[name].chunk.js";
  config.output.filename = 'static/js/bundle.js',


  //Config to avoid including react js inside the bundle
  config.externals = config.externals || {};
  config.externals.react = "React";

  //Config to set the base path to load media resources along the code 
  config.module.rules.forEach(topRule => {
    if (topRule.oneOf) {
      topRule.oneOf.forEach(rule => {
        if (rule.loader && rule.loader.indexOf('url-loader') !== -1) {
          rule.test.push(/\.svg$/);
          rule.test.push(/\.woff$/);
          rule.options.publicPath = basePath
        }
      })
    }
  });
  return config;
};