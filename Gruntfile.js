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

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: '',
        dist: 'dist',
        tmp: '.tmp',
        war: 'target'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/**/*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            },
            react: {
                files: ['<%= yeoman.app %>/scripts/ek-react/**/*.jsx'],
                tasks: ['react']
            }
        },
        prism: {
            options: {
                mocksPath: './mocks',
                context: '/ek',
                host: 'localhost',
                port: 8083,
                https: false
            },
            mock: {
                options: {
                    mode: 'mock'
                }
            },
            record: {
                options: {
                    mode: 'record'
                }
            },
            proxy: {
                options: {
                    mode: 'proxy'
                }
            },
            mockrecord: {
                options: {
                    mode: 'mockrecord'
                }
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
                            require('grunt-connect-prism/middleware'),
                            proxySnippet,
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            ie: {
                options: {
                    middleware: function(connect) {
                        return [
                            require('grunt-connect-prism/middleware'),
                            proxySnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            home: {
                options: {
                    middleware: function(connect) {
                        return [
                            require('grunt-connect-prism/middleware'),
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*', 'node_modules/ek-react'],
            server: '.tmp'
        },
        jshint: {
            js: {
                options: {
                    jshintrc: '.jshintrcJs',
                    reporter: require('jshint-stylish')
                },
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    '!<%= yeoman.app %>/scripts/routes/*',
                    '!<%= yeoman.app %>/scripts/vendor/*'
                ]
            },
            jsRouters: {
                options: {
                    jshintrc: '.jshintrcJsRouters',
                    reporter: require('jshint-stylish')
                },
                src: [
                    '<%= yeoman.app %>/scripts/routes/*'
                ]
            },
            jsx: {
                options: {
                    jshintrc: '.jshintrcJsx',
                    reporter: require('jshint-stylish')
                },
                src: [
                    'node_modules/ek-react/*'
                ]
            }
        },
        jscs: {
            js: {
                src: [
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    '!<%= yeoman.app %>/scripts/vendor/*'
                ],
                options: {
                    config: '.jscsrc',
                    verbose: true
                }
            },
            jsx: {
                src: [
                    'node_modules/ek-react/{,*/}*.js',
                    '!node_modules/ek-react/bower_components/*'
                ],
                options: {
                    config: '.jscsrcJsx',
                    verbose: true
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                importPath: '<%= yeoman.app %>/bower_components',
                specify: '<%= yeoman.app %>/styles/main.scss',
                cssDir: '.tmp/styles',
                sourcemap: false,
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt,png}',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }, {
                    src: 'node_modules/apache-server-configs/dist/.htaccess',
                    dest: '<%= yeoman.dist %>/.htaccess'
                }]
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }
            }
        },
        war: {
            target: {
                options: {
                    /*jshint camelcase: false */
                    war_dist_folder: '<%= yeoman.war %>',
                    war_name: 'ek-frontend',
                    webxml: function() {
                            var fs = require('fs');
                            return fs.readFileSync('web.xml', 'binary');
                        }
                        /*jshint camelcase: true */
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['**/*'],
                    dest: ''
                }]
            }
        },
        react: {
            jsx: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts/ek-react',
                    src: ['**/*.jsx'],
                    dest: 'node_modules/ek-react',
                    ext: '.js'
                }]
            }
        },
        removelogging: {
            dist: {
                src: ['<%= yeoman.dist %>/scripts/main.js', '<%= yeoman.dist %>/scripts/react.js']
            }
        },
        browserify: {
            options: {
                transform: [require('grunt-react').browserify]
            },
            dist: {
                src: ['<%= yeoman.app %>/scripts/main.js'],
                dest: '<%= yeoman.tmp %>/scripts/bundle.js',
                options: {
                    transform: [require('grunt-react').browserify],
                    debug: true
                }
            },
            watchClient: {
                src: ['<%= yeoman.app %>/scripts/main.js'],
                dest: '<%= yeoman.tmp %>/scripts/bundle.js',
                options: {
                    transform: [require('grunt-react').browserify],
                    watch: true,
                    browserifyOptions: {
                        debug: false
                    }
                }
            }

        }
    });

    grunt.registerTask('setNodePath', function() {
        process.env.NODE_PATH = './app';
        console.log('Setting NODE_PATH to: ' + process.env.NODE_PATH);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function(target, option) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        if (target === 'home') {
            return grunt.task.run([
                'setNodePath',
                'clean:server',
                'react',
                'browserify:watchClient',
                'compass:server',
                'prism:' + (option ? option : 'mock'),
                'connect:home',
                'open:server',
                'watch'
            ]);
        }

        if (target === 'ie') {
            return grunt.task.run([
                'setNodePath',
                'clean:server',
                'react',
                'browserify:watchClient',
                'compass:server',
                'configureProxies:livereload',
                'connect:ie',
                'prism:record',
                'open:server',
                'watch'
            ]);
        }

        return grunt.task.run([
            'configureProxies:livereload',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'setNodePath',
        'clean:dist',
        'react',
        'jshint',
        'jscs',
        'browserify:dist',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'removelogging',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('buildwar', [
        'build',
        'war'
    ]);

    grunt.registerTask('default', [
        'clean',
        'build'
    ]);
};

