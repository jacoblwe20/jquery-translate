module.exports = function(grunt) {

  // Project configuration

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner : '/*\n * <%= pkg.name %>.js - <%= pkg.version %> \n' + 
      ' * Author : <%= pkg.author %> \n' +
      ' */\n\n',
    uglify: {
      options: {
        banner: "<%=banner%>"
      },
      build: {
        src: ['src/*.js'],
        dest: 'build/<%= pkg.name.toLowerCase() %>.min.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/*.js']
    },
    concat: {
      options: {
        banner: "<%=banner%>",
        separator: '\n\n',
        stripBanners : true
      },
      dist: {
        src: ['src/*.js'],
        dest: 'build/<%= pkg.name.toLowerCase() %>.js'
      }
    }
    // simplemocha: {
    //   all: { src: 'test/*.js' }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('test', ["jshint"]);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask("default", ["jshint", "concat", "uglify"]);

};