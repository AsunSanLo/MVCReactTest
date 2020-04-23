const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function override(config, env) {
    config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].chunk.css',
        ignoreOrder: false,
    }));
    config.output.chunkFilename = "static/js/[name].chunk.js";

    config.module.rules.forEach(topRule=> {
        if (topRule.oneOf) {
            topRule.oneOf.forEach(rule => {
                if (rule.loader && rule.loader.indexOf('url-loader') !== -1) {
                    rule.test.push(/\.svg$/);
                    rule.test.push(/\.woff$/);
                    rule.options.publicPath = '/ReactApp/sample-with-dll/build/'
                }
            })
        }
    });
    return config;
  }