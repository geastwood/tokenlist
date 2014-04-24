module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({
        injector: {
            classList: {
                options: {
                    template: 'dist/classList.wrapper.js',
                    destFile: 'dist/classList.build.js',
                    starttag: '/* injector:{{ext}} */',
                    endtag: '/* endinjector */',
                    min: true,
                    transform: function(filepath) {
                        return grunt.file.read(filepath.slice(1));
                    }
                },
                src: ['src/tokenlist.js']
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/classList.min.js': ['dist/classList.build.js']
                }
            }
        },
        jasmine: {
            src: 'src/*.js',
            options: {
                specs: 'tests/*.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js', 'tests/*.js'],
                tasks: ['jasmine']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-injector');

    grunt.registerTask('default', 'watch');
    grunt.registerTask('build', ['injector'/*, 'uglify'*/]);
};
