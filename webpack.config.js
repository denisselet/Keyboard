const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    context: path.resolve(__dirname, 'src'),
    // mode: 'development',
    entry: './index.js',
    output: {
        filename: './[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {

    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif|html|css)$/,
                use: ['file-loader']
              },
            {
                // test: /\.js$/,
                // exclude: /node_modules/,
                // use: ['eslint-config-airbnb-base',
                // {
                //     presets: [
                //       '@babel/preset-env'
                //     ],
                //     plugins: [
                //       '@babel/plugin-proposal-class-properties'
                //     ]
                //   }
            // ]
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Virtual Keyboard',
          filename: './index.html',
          template: './index.html',
        }),
      ],

};
