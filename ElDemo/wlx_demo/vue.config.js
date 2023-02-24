module.exports = {
  devServer: {
    proxy: {
      '/node': {
        target: "http://localhost:80",
        ws: true,
        changeOrigin: true,
        pathRewrite: {        //  /api 替换
          '^/node': ''
        }
      }
    }
  }
}


// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     plugins: [
//       new NodePolyfillPlugin()
//     ],
//   target:'node',
//   },
//   devServer: {
//     proxy: {
//       '/node': {
//         target: "http://localhost:80",
//         ws: true,
//         changeOrigin: true,
//         pathRewrite: {        //  /api 替换
//           '^/node': ''
//         }
//       }
//     }
//   }

// })