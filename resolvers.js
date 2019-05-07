module.exports = {
  Query: {
    getAppInfo: async (parent, {}, {}) => {
      console.log('getAppInfo')
      if (Math.random() < 0.5) {
        throw new Error('Testing getAppInfo')
      }
      return { name: 'my app' }
    },
  },
}
