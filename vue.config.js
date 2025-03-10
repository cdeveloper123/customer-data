module.exports = {
  transpileDependencies: [],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/styles/main.scss";`
      }
    }
  },
  devServer: {
    contentBase: './public'
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
