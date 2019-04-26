module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta'
  ],
  env: {
    cjs: {
      presets: [
        ['@babel/preset-env', { targets: { node: '8' }, modules: 'commonjs' }]
      ],
      plugins: ['@babel/plugin-transform-destructuring'],
      ignore: [
        'src/lib/http/gqlFunction.mjs',
        'src/lib/build/prepare/functions/setTemplateLocation.mjs',
        'src/lib/build/bundle/setDistDir.mjs'
      ]
    },
    mjs: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { esmodules: true, node: true },
            modules: false,
            loose: true
          }
        ]
      ]
    }
  }
}
