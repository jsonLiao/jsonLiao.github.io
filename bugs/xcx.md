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