const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const {nodeResolve} = require('@rollup/plugin-node-resolve')

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      name: 'ConvertNative',
      file: 'dist/index.js'
    },
    {
      format: 'es',
      file: 'dist/index.esm.js'
    },
  ],
  plugins: [
    typescript({
      module: 'esnext',
      target: 'es5',
    }),
    nodeResolve({
      browser: true,
    }),
    commonjs({
      extensions: ['.js', '.ts'],
    })
  ]
}
