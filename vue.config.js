const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/main.scss";
        `
      }
    }
  },
  devServer: {
    static: {
      directory: './public'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
