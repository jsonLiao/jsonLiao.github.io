// 定义有依赖的模块
define(['dataService', 'jquery'], function(dataService, $) {
  let name = 'Tom'
  function showMsg() {
    console.log(dataService.getMsg() + ', ' + name)
  }
  $('body').append('<h1>Hello amiKing</h1>')
  // 暴露模块
  return { showMsg }
})
