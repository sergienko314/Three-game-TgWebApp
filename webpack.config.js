module.exports = {
  // другая конфигурация
  ignoreWarnings: [
    function (warning) {
      // Игнорировать предупреждение, связанное с картой исходного кода @mediapipe/tasks-vision
      return warning.message.includes("Failed to parse source map from");
    },
  ],
};
