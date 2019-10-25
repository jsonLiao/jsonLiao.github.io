(function (window, dataService) {
  let name = 'Tom'

  function showMsg() {
    console.log(dataService.getMsg() + ', ' + name)
  }

  window.alerter = {showMsg}
})(window, dataService)