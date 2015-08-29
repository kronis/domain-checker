'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var config = {
        app: ''
    };

    grunt.initConfig({
        config: config,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= config.app %>/*.html',
                    '{.tmp,<%= config.app %>}/styles/**/*.css',
                    '{.tmp,<%= config.app %>}/scripts/**/*.js',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                hostname: 'localhost'
            },
            proxies: [{
                context: '/ds',
                host: 'domeneshop.no',
                port: 80,
                xforward: true,
                rewrite: {
                    '^/ds': '/'
                }
            }],
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            proxySnippet,
                            lrSnippet,
                            mountFolder(connect, config.app)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });

    grunt.registerTask('serve', function(target, option) {
        return grunt.task.run([
            'configureProxies:livereload',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'serve'
    ]);
};

