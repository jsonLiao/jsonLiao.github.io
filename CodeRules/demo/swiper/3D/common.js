// 页面乱转规则
/**
 *  样式规则 rem =  实际大小 / 50 =  (x)rem
 */
var i = 0;
i = window.devicePixelRatio > 1 ? 1 / devicePixelRatio : 1;
document.write('<meta name="viewport" content="width=device-width,initial-scale=' + i + ',minimum-scale=' + i + ',maximum-scale=' + i + '">');
window.addEventListener('resize', pageSize);
window.addEventListener('load', pageSize);
pageSize();

function pageSize() {
  var ohtml = document.getElementsByTagName('html')[0];
  var iWidth = ohtml.getBoundingClientRect().width || document.documentElement.clientWidth;
  iWidth = iWidth > 750 ? 750 : iWidth;
  ohtml.style.fontSize = iWidth / 15 + 'px';
}