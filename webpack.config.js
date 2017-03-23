// // You shouldn't have to touch this webpack file. 
// const webpack = require('webpack');
// const path = require('path');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// // Removes Deprecation Warning
// process.noDeprecation = true;


// // Build directory is where the bundle file will be placed
// const BUILD_DIR = path.resolve(__dirname, 'client/dist');
// // App directory is where all of your raw JSX files will be placed
// const SRC_DIR = path.resolve(__dirname, `client/src`);
// //Public directory is where all of are html/css files will be placed
// const PUBLIC_DIR = path.resolve(__dirname, 'client/public');

// const config = {
//   entry: [
//     'react-hot-loader/patch',
//     'webpack-dev-server/client?http://localhost:8080',
//     'webpack/hot/only-dev-server',
//     path.resolve(SRC_DIR, 'index.jsx'),
//   ],
//   output: {
//     filename: 'bundle.js',
//     path: BUILD_DIR,
//   },
//   module: {
//     rules: [
//       {
//         loader: 'react-hot-loader/webpack',
//         test: SRC_DIR
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.png$/,
//         use: {
//           loader: 'url-loader',
//           options: { limit: 10000 } }
//       },
//       {
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         test: SRC_DIR,
//         query: {
//           presets: ['es2015', 'react', 'stage-0'],
//           plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
//         },
//       },
//     ],
//     loaders: [
//       {
//         test: /\.jsx?/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['es2015', 'react', 'stage-0'],
//           plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
//         }
//       },
//     ]
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx'],
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NamedModulesPlugin(),
//     new webpack.NoEmitOnErrorsPlugin(),
//     new CopyWebpackPlugin([{ from: PUBLIC_DIR }]),
//     new DashboardPlugin(),
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production'),
//       }
//     }),
//   ],
//   watch: true,
//   stats: { colors: true },
//   devtool: 'inline-source-map',
//   devServer: {
//     host: 'localhost',
//     port: 8080,
//     historyApiFallback: true,
//     contentBase: './',
//     hot: true
//   }
// };

// module.exports = config;


const webpack = require('webpack')
const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')


// Build directory is where the bundle file will be placed
const BUILD_DIR = path.resolve(__dirname, 'client/dist');
// App directory is where all of your raw JSX files will be placed
const SRC_DIR = path.resolve(__dirname, `client/src`);
//Public directory is where all of are html/css files will be placed
const PUBLIC_DIR = path.resolve(__dirname, 'client/public');


// const SRC_DIR = path.resolve(__dirname, 'app/src')
// const PUBLIC_DIR = path.resolve(__dirname, 'app/public')
// const BUILD_DIR = path.resolve(__dirname, 'app/build')

module.exports = {
  entry: {
    main: path.resolve(SRC_DIR, 'index.jsx'),
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        loader: 'react-hot-loader/webpack',
        test: SRC_DIR,  //.js work?
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: SRC_DIR,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 100000 } },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.jpg$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: { limit: 8192, name: 'fonts/[name].[ext]?[hash]' },
      }],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: PUBLIC_DIR }]),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
  watch: true,
  stats: { colors: true },
  devtool: 'eval'
}