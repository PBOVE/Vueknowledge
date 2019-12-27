module.exports = {
    outputDir:process.env.outputDir,
    devServer:{
        proxy:{
            '/api':{
                target:"http://knowledge.pchelper666.com/api",
                changeOrigin: true,
            }
        }
    }
}
