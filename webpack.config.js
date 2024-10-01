module.exports = {
  // Другая конфигурация...
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules/, // Игнорируем все node_modules
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /@mediapipe\/tasks-vision/,
      message: /Failed to parse source map/,
    },
  ],
};
