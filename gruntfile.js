module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			// define the files to lint
			files: ['gruntfile.js', 'app/**/*.js'],

			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				ignores: ['app/lib/*.js'],
				// more options here if you want to override JSHint defaults
				globals: {
					jquery: false,
					require: true,
					console: true,
					module: true
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			express: {
				files:  [ 'app/**/*.js', 'app/**/*.html', 'app/**/*.css', 'app/**/*.less' ],
				tasks:  [ 'less:development', 'express:dev' ],
				options: {
					spawn: false
				}
			}
		},

		less: {
            development: {
                options: {
                    paths: ["app/styles"]
                },
                files: {
                    "app/styles/style.css": "app/styles/style.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        imgPath: '"http://mycdn.com/path/to/images"',
                        bgColor: 'red'
                    }
                },
                files: {
                    "app/styles/style.css": "app/styles/style.less"
                }
            }
        },

		express: {
			options: {
				// Override defaults here
			},
			dev: {
				options: {
					script: 'server/server.js'
				}
			}
		},

		open : {
			dev: {
				path: 'http://localhost:3000/index.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('build', [
		'jshint',
		'watch'
	]);

	grunt.registerTask('server', [
        'less:development',
		'express:dev',
		'open:dev',
		'watch'
	]);

	grunt.registerTask('default', [
		'jshint',
	 	'watch'
	]);
};