module.exports = {
  devServer: {
    proxy: {
      'logger/modules/managegroups/app.php': {
        target : 'https://192.168.10.237:8087'
      }
    }
  }
}
