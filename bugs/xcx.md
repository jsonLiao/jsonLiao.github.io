1. 小程序 textarea 穿透问题（弹出层无法遮挡textarea）？
  ios手机存在这个问题，
  解决方法：1.>根据弹层的显示与隐藏来控制textarea的显示与隐藏。（暴力手段）

2. Wxml2Canvas 海报生成插件有时候生成部分图片空白的情况 
  1.> 尽量使用尺寸大小过小的图片
  2.> 生成出来的图片直接调用wx.saveImageToPhotosAlbum 即可下载

3. 小程序基于mpvue框架-在使用组件卡槽的时候-修改数据之后经常无法更新
  不知道为什么，会存在缓存，整个重新编译（重新跑命令行）数据就更新了

4. 小程序在生成海报的时候，wx.canvasToTempFilePath在安卓机生成的图片过大，导致图片生成的时候比较慢。（兼容问题）
  解决方法：在wx.canvasToTempFilePath方法配置宽度与高度。
  
5. 小程序默认元素出现滚动条问题，iphone7 会出现滚动条（兼容问题----------滚动条问题）
  解决方法：将overflo-y: scroll; 改为 overflow-y: auto; 的时候有时候可以有时候不可以（排除）
  其它：
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  用这个新式的时候也不行 （scroll-view 为纵向滚动的时候不行，横向滚动的时候可以）
  最终解决方案：
  把scroll－view 宽度增大到父级可视区范围之外，通过父级的overflow:hidden;来隐藏

6. 保存图片的时候，当需要授权的时候，如果选择取消的时候，再次点击授权一直提示下载失败？（开发过程中没有考虑到的点）
   在点击取消授权的时候，需要奖授权状态更改过来，

7. ......




others----------------

1.slot

不能用slot-scope
slot的内容会作为组件根元素的兄弟插入，不按你写的层级渲染
2.scroll-view

height必须要有值,若用flex布局动态改变scroll-view的高度，事件不会触发。
编辑器内快速滑动 不触发 scrolltolower
3.wx:if

可以用它控制 live-player live-pusher 的层级
4.page.json

“backgroundColor”: “#ff0000” ，即使页面为空也是下拉才能看见颜色
5.wxss

不能使用本地图片
6.image

设置属性mode="widthFix"样式width: 100%; display: block;高度自动撑开
7.button按钮 open-type=“getUserInfo”

授权过一次后，偶尔不弹窗，但会进入授权回调的方法，删掉小程序后再进入还是会弹的
8.设置 navigationBarTitleText 无效

一种可能是页面路径没有放在page.json里面
9.在组件中使用 this.createSelectorQuery()而非 wx.createSelectorQuery()

10.lottie配置信息中animationData的值注意是相对路径，require不支持绝对路径，部分android机型会导致闪退
11.cover-view或里面的button不支持渐变色


