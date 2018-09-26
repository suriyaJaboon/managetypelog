module.exports = {
  devServer: {
    proxy: {
      '/mock-data.json': {
      // 'logger/modules/managegroups/app.php': {
        // target : 'https://192.168.10.237:8087'
        target : 'http://127.0.0.1:8081'
      }
    }
  }
}
