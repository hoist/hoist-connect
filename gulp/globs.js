var root = process.cwd();
module.exports = {
  js: {
    src: [root + '/src/**/*.js'],
    lib: [root + '/lib/**/*.js'],
    gulpfile: ['Gulpfile.js'],
    specs: ['tests/**/*.js', '!tests/fixtures/**/*']
  },
  specs: ['tests/**/*.js', '!tests/fixtures/**/*']
};
