const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  // Если разработка в прадакши - eval
  devtool: mode === "production" ? "eval" : false,
  // Точка входа путь из 'src/index.jsx'
  entry: path.resolve(__dirname, "src", "index.jsx"),
  // Точка выхода
  output: {
    // Путь 'dist',
    path: path.resolve(__dirname, "dist"),
    // Чистить при сборке
    clean: true,
    // Добавлять названию файла contenthash (Расширение '.js' т.к. браузер не понимает '.jsx')
    filename: "[name][contenthash].js",
    // Дополнительные файлы скидывать в папку 'assets/'
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  // При импорте не указывается расширение в файлах
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // Настрройка локального сервера
  devServer: {
    port: 3000,
    open: true,
    // Перезагружать страницу если есть изменения
    hot: true,
  },
  // Плагины
  plugins: [
    new HtmlWebpackPlugin({
      // Если в HTML что-либо подключаем - отображает (следит за) изменения(ми)
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  // Модули
  module: {
    rules: [
      // Работа с скриптми
      {
        test: /\.[tj]sx?$/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      // Работа с стилями
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "sass-loader",
        ],
      },
      // Работа с изображениями
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        // Перемещаем
        type: "asset/resource",
      },
      // Работа с шрифтами
      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]",
        },
      },
      // Работа с HTML
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
