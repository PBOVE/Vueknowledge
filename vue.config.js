module.exports = {
    outputDir:process.env.outputDir,
    devServer:{
        proxy:{
            '/api':{
                target:"https://knowledge.pchelper666.com/api",
                changeOrigin: true,
            }
        }
    }
}
