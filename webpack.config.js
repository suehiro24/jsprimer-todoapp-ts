/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require("path");
const distPath = path.join(__dirname, "dist");

module.exports = {
    mode: "development", // "production" | "development" | "none"

    target: "web", // 'node'

    entry: "./src/index.ts",
    output: {
        path: distPath,
        filename: "index.js",
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
        ],
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        modules: [
            "node_modules", // node_modules 内も対象とする
        ],
        extensions: [
            ".ts",
            ".js", // node_modulesのライブラリ読み込みに必要
        ],
    },
    // webpack-dev-server
    devServer: {
        contentBase: distPath,
        inline: true,
        hot: true,
    },
    // create source-map
    devtool: "inline-source-map",
};
