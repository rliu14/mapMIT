var path = require('path');
var webpack = require('webpack');

// Based on template from:
// https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html
module.exports = {
    entry : './react/main.js',
    output : { path : __dirname+'/public/js', filename : 'bundle.js' },
    module : {
        loaders : [
            {
                test : /.jsx?$/,
                loader : 'babel-loader',
                exclude : /node_modules/,
                query : {
                    presets : ['es2015', 'react']
                }
            },
            { test : /\.css$/, loader : 'style-loader!css-loader' },
            { test: /\.(svg|ttf|woff|eot|woff2)(\?.*)?$/, loader: 'file' },
            { test : /\.json$/, loader: 'json'},
            { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [
                  'file?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};