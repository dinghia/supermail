module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
    },
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                // @表示src的地址
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}