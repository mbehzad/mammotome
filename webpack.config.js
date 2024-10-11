const path = require('path');

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { globSync } = require('glob');

const cssfiles = globSync(['styles/**/*.css', 'blocks/**/*.css', 'plugins/**/*.css'])
  .map((filepath) => `./${filepath.replaceAll(path.sep, '/')}`);

module.exports = {
  mode: 'production', // 'production' | ' development'
  devtool: false,
  entry: {
    main: './scripts/scripts.js',
    styles: {
      import: cssfiles,
    },
  },
  output: {
    path: path.resolve(__dirname, 'resources2'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      // eslint-disable-next-line max-len
      // For webpack@5 you can use the ... syntax to extend existing minimizers (i.e. `terser-webpack-plugin`),
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
