module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: {
      optimization: {
        splitChunks: {
          chunks: 'all',
          name: true,
        }
      }
    }
  }
};
