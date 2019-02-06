export default {
  require: ['esm'],
  files: ['test/lib/**/*.js', '!test/sample/**/*.*'],
  cache: true,
  concurrency: 5,
  failFast: true,
  failWithoutAssertions: false,
  tap: true,
  verbose: true,
  compileEnhancements: false,
  babel: false,
  extensions: ['js', 'mjs']
}
