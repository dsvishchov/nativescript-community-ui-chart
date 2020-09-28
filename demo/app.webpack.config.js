const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const { resolve } = require('path');

module.exports = (env, params = {}) => {
    const { development } = env;
    const projectRoot = __dirname;
    const config = webpackConfig(env, params);
    config.resolve.alias['@nativescript/core'] = '@akylas/nativescript';
    if (development) {
        const srcPath = resolve(projectRoot, '..', 'src', 'charting');
        config.resolve.alias['@nativescript-community/ui-chart'] = srcPath;
        config.resolve.alias['@nativescript-community/ui-chart$'] = resolve(srcPath, 'charts');
        console.log('development', srcPath, config.resolve.alias);
        config.plugins.push(new webpack.ContextReplacementPlugin(new RegExp('@nativescript-community/ui-chart'), srcPath));
    }
    return config;
};
