function progressLoading() {
  var loadings = $("#loading");
  var num = 0;
  var arr = [
    'images/logo.png',
    'images/dot.png',
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/bg11.jpg'
  ];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var img = new Image();
    img.src = arr[i];
    img.onload = function () {
      num++;
      var scale = Math.floor((num / len) * 100);
      // console.log(scale)
      loadings.find(".process").html(scale + '%');
      if (scale == 100) {
        // 首屏加载完毕
        setTimeout(function () {
          loadings.hide();
        }, 500);
      }
    }
  }
}

function playAudio() {
  //音乐点击暂停或播放
  var audioAuto = true; //默认音乐是播放的,当用户点击了就为false,这样可以区别用户点击和系统进制
  var audioBtn = document.getElementById("audioBtn");
  var media = document.createElement('audio');
  media.id = 'media';
  media.loop = 'loop';
  media.src = 'audio/pm.mp3';
  media.autoplay = 'autoplay';
  media.preload = 'preload'; //规定页面加载完成后载入音频
  audioBtn.appendChild(media);
  // addEvent(document, 'touchstart', function () {
  //   if (media.paused && audioAuto) {
  //     media.play();
  //     addClass(audioBtn, 'rotate');
  //   }
  // }, false);
  addEvent(audioBtn, 'click', function () {
    audioAuto = false;
    if (media.paused) {
      media.play();
      addClass(this, 'rotate');
    } else {
      media.pause();
      removeClass(this, 'rotate');
    }
  }, false);
}

/**
 * 追加className
 * @param {String} [element]
 * @param {String} [attr]
 */
function addClass(element, attr) {
  attr = attr.trim();
  //这里去左右空格,是为了防止用户输入多余空格,影响下边的判断
  var className = element.className.trim();
  //正则里,考虑了2种className,1.class='aa1';2.class='aa2 aa3 aa4 aa5';aa1对应了正则里第一种假设,aa2对应了第二种,aa3对应了第三种,aa5对应了第四种
  //var pattern=new RegExp('^'+attr+'$|^'+attr+' | '+attr+' | '+attr+'$','g');
  var pattern = new RegExp('\\b' + attr + '\\b', 'g');
  //为false,说明attr不存在className里,那么就添加
  if (!pattern.test(className)) {
    element.className = className + ' ' + attr;
  }
}

/**
 * 删除className
 * @param {String} [element]
 * @param {String} [attr]
 */
function removeClass(element, attr) {
  attr = attr.trim();
  if (!element.className || element.className == attr) {
    element.className = '';
  } else {
    var arr = element.className.split(" ");
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] == attr) {
        arr.splice(i, 1);
      }
    }
    element.className = arr.join(' ');
  }
}

/**
 * window.onload加载方法的封装
 * @param {Function} [fn]
 */
function addLoadEvent(fn) {
  var load = window.onload;
  if (!load) {
    window.onload = fn;
  } else {
    window.onload = function () {
      load();
      fn();
    }
  }
}

/**
 * 事件封装
 * @param {Element} [obj]
 * @param {Event} [event]
 * @param {Function} [fn]
 * @param {*} capture 
 */
function addEvent(obj, type, fn, capture) {
  if (obj.addEventListener) {
    obj.addEventListener(type, fn, capture);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + type, fn);
  }
}

/**
 * 删除事件
 * @param {*} obj 
 * @param {*} type 
 * @param {*} fn 
 * @param {*} capture 
 */
function removeEvent(obj, type, fn, capture) {
  if (obj.removeEventListener) {
    obj.removeEventListener(type, fn, capture);
  } else if (obj.detachEvent) {
    obj.detachEvent("on" + type, fn);
  }
}