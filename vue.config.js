module.exports = {
  devServer: {
    proxy: {
      // '/mock-data.json': {
      'logger/modules/managetypelog/api.php': {
        target : 'https://192.168.10.237:8087'
      }
    }
  }
}
