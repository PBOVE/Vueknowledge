module.exports = {
    outputDir:process.env.outputDir,
    configureWebpack: {
      externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'vuex': 'Vuex',
          'axios': 'axios',
          'jquery': '$',
          'echarts': 'echarts'
      }
    },
    devServer:{
        proxy:{
            '/api':{
                target:"https://knowledge.pchelper666.com/api",
                changeOrigin: true,
            }
        }
    }
};
