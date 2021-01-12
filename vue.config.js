module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    //port: 3000,
    //proxy: 'https://localhost:3000'
   host: "localhost"
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
};
