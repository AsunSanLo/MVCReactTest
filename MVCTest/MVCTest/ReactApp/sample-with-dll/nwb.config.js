module.exports = process.env.NODE_ENV === 'production' ? {
    webpack: {
      publicPath: '',
      extra: {
        output: {
          filename: '[name].js',
          chunkFilename: '[name].js'
        }
      },
      loaders: {
          fonts: {
              query: {
                  name:'[name].[hash:8].[ext]',
                  publicPath: './'
              }
          },
          css: {
            query: {
                filename: '[name].css'
            }
          }
      }
    }
  } : {}