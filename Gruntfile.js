'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['app/dist'],
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'app/scripts/{,*/}*.js',
        'Gruntfile.js'
      ]
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          'app/dist/app.css': 'app/styles/app.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 100 versions']
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'app/dist/*.css',
          dest: 'app/dist/'
        }]
      }
    },
    copy: {
      dist: {
        files: [
          {'app/dist/index.html': 'app/index.html'}
        ]
      }
    },
    cssmin: {
      dist: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          src: [
            'app/bower_components/normalize.css/normalize.css',
            'app/dist/app.css'
          ],
          dest: 'app/dist/app.min.css'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          'app/dist/app.min.js': 'app/scripts/app.js'
        }
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      dist: {
        src: ['app/dist/*.min*.js', 'app/dist/*.min*.css']
      }
    },
    usemin: {
      html: 'app/dist/index.html',
      options: {
        assetsDirs: 'app/dist'
      }
    },
    connect: {
      server: {
        options: {
          base: 'app',
          keepalive: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'clean',
    'sass',
    'autoprefixer',
    'copy',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);
};