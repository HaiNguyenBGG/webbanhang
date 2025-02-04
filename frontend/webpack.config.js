const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development", // Cho phép chọn chế độ qua biến môi trường
  entry: path.resolve(__dirname, "src", "index.tsx"), // Đảm bảo đường dẫn đúng
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/" // Quan trọng để hỗ trợ react-router-dom
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "src", "components"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@context": path.resolve(__dirname, "src", "context"),
      "@assets": path.resolve(__dirname, "src", "assets")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i, // Hỗ trợ import ảnh
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "index.html"
    })
  ],
  performance: {
    hints: false // Ẩn cảnh báo về kích thước file
  },
  devServer: {
    static: path.join(__dirname, "public"),
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true // Quan trọng để hỗ trợ react-router-dom
  }
};