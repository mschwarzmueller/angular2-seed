var path = require("path");
var Builder = require('systemjs-builder');
const del = require('del');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('dist', 'src/systemjs.config.js');

builder
    .bundle('app/main.js', './dist/app/main.js', { minify: true, encodeNames: false})
    .then(function() {
        del(['./dist/app/**/*.js', '!./dist/app/main.js']).then(function (paths) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
        console.log('Build complete');
    })
    .catch(function(err) {
        console.log('Build error');
        console.log(err);
    });