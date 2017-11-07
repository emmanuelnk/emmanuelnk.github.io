module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        hexo: {
            clean: {
                options: {
                    root: '/',
                    cliCmd: 'clean'
                }
            },
            generate: {
                options: {
                    root: '/',
                    cliCmd: 'generate'
                }
            },
        },
    });
    // load grunt wrappers below
    grunt.loadNpmTasks('grunt-hexo');

    grunt.registerTask('default', ['hexo:clean', 'hexo:generate']);

};