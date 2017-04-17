var path = require('path');
var webpack = require('webpack');
var urlloader = require('url-loader');

function walkSync(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            callback(filePath, stat);
            walkSync(filePath, callback);
        }
    });
}

var window={}

var getElementsByTagName = function (b) { 
                            return [{appendChild:function (c){
                                            global['webpackJsonp'] = window['webpackJsonp'];
                                            global['React']=React;
                                            getAsset(c.src)
                                    }}]
                            }
var createElement = function (t) {return {}}




var Uglify = new webpack.optimize.UglifyJsPlugin({
       comments: false,
       compress: {
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        drop_debugger: true,
        negate_iife: true,
        unsafe: true,
        hoist_vars: true,
        side_effects: true
    }
    ,sourceMap: true
    
});
var Config = {
  //node: {process:false},
  output: { 
    path: __dirname +'/compiled/'
    ,chunkFilename: "[name].js"
    ,filename: '[name].js'
    ,libraryTarget: 'umd'
    ,chunkLoadTimeout: 120000
    ,publicPath: "/js/"
    },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules|react-custom-scrollbars/,
        query: {
          presets: ['react', 'stage-2','es2015-native-modules'],
          plugins: ["transform-object-rest-spread","transform-object-assign"]
        }
      }
    ]
  },
  postcss: function () {
    return [require('autoprefixer')];
  }
};
//Config.externals =  { 
//                "react": {root: "React", commonjs2: "react",  commonjs: "react", umd: "react"},
//                "react-dom": {root: "ReactDom", umd:"react-dom"}, 
//                "redux": "Redux", 
//                "react-redux":"ReactRedux", 
//                //"react-router":"ReactRouter"
//            };// "flickity":"Flickity"},

Config.resolve = {
    //root: [path.resolve('./compiled/')],
    root: [path.resolve('./node_modules/')],
    extensions: ["", ".js", "jsx", "js6"],
    alias: { /*need these for flickity*/
      'eventEmitter/EventEmitter': 'wolfy87-eventemitter/EventEmitter',
      'get-style-property': 'desandro-get-style-property',
      'matches-selector': 'desandro-matches-selector',
      'classie': 'desandro-classie'
  }
} 
Config.plugins = [];
Onsite = JSON.parse(JSON.stringify(Config));
Onsite.module.loaders = Config.module.loaders;
    var DefinePlugin = webpack.DefinePlugin;
    Onsite.output.path = __dirname +'/compiledos/'
    Onsite.plugins.push(new DefinePlugin({'process.env':{NODE_ENV: JSON.stringify('production')}}));
    Onsite.plugins.push(Uglify);
    Onsite.resolve.alias['react'] = 'react-lite';
    Onsite.resolve.alias['react-dom'] = 'react-lite';
    Onsite.entry = {bundle:['./index.js']};

    var React = require("react");
    var ReactDom = require("react-dom");
    var Redux = require("redux");
    var ReactRouter = require("react-router");
    var ReactRedux = require("react-redux");
    
    var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
    var ExtractTextPlugin = require('extract-text-webpack-plugin')


    var locals = {
      paths: [
        '/'
        ,'/login'
        ,'/about'
        ,'/svcs'
        ,'/remind'
        ,'/register'
        ,'/reset'
        ,'/download'
        ,'/chatlogs'
      ], 
      scope:{
        React: React, 
        ReactDom: ReactDom, 
        Redux: Redux, 
        ReactRedux: ReactRedux, 
        ReactRouter: ReactRouter 
        //,window:window
        //,webpackJsonp: function(){}
        //,document:{
        //    getElementsByTagName:getElementsByTagName,
        //    createElement:createElement
        // }
        //documentElement:["classList"]}, 
        //Element:{prototype:{matches:false}}
      }
    }
    Config.entry = {bundle:['./index.js'], main:['./main.js'], fonts:['./style.scss']};
    Config.module.loaders.unshift({
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style","css!postcss!sass"),
        options: {
            minimize: true
        }
    })
    Config.plugins.push(
        new ExtractTextPlugin('css/[name].css', {
                allChunks: true
        }),
        new StaticSiteGeneratorPlugin('main', locals.paths, locals,locals.scope,true)
      );

module.exports = [Onsite, Config];

