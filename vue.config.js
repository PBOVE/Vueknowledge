module.exports = {
    outputDir:process.env.outputDir,
    devServer:{
        proxy:{
            '/api':{
                target:"http://119.29.218.18:8080/",
                changeOrigin: true,
            }
        }
    }
}
