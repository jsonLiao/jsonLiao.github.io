var poster = {};
poster.list = [];
poster.cvs = document.createElement('canvas');
poster.count = 1;
poster.init = function (i) {
  // 创建海报预览dom结构
  this.count == 1 && this.ItemDom(posterJson.bg);

  // 自动生成二维码, 目前需求用的是太阳码,二维码功能暂时没有开启
  // this.createCode();

  //开始生成海报
  poster.render(i);
}
poster.render = function (i) {
  var cvs = this.cvs;
  var ctx = cvs.getContext('2d');
  cvs.id = "sharePoter";
  cvs.width = 750 * 2;
  cvs.height = 1334 * 2;
  ctx.scale(2, 2);
  cvs.setAttribute('width', cvs.width / 2)
  cvs.setAttribute('height', cvs.height / 2);
  cvs.style.width = cvs.width / 2 + 'px';
  cvs.style.height = cvs.height / 2 + 'px';
  ctx.restore();
  this.renderBg(cvs, ctx, i);
}
poster.renderBg = function (cvs, ctx, i) {
  var _this = this;
  var bgImg = new Image();
  bgImg.setAttribute("crossOrigin", 'Anonymous');
  bgImg.src = posterJson.bg[i - 1];

  // 只有当图片加载完成后cancas 才可以生成可见的图片
  bgImg.onload = function () {
    // 画背景图
    ctx.drawImage(bgImg, 0, 0, 750, 1334);
    ctx.restore();

    // 画太阳码或二维码
    _this.DrawCode(ctx, i, function () {
      // 生成背景图
      var newBg = cvs.toDataURL('image/png');
      document.querySelectorAll(".swiper-slide")[i - 1].querySelector("img").setAttribute('src', newBg);
      _this.count += 1;

      // 只有两张海报的时候
      if (posterJson.bg.length >= 2 && _this.count == 2) {
        poster.trigger('2');
      }
      if (posterJson.bg.length == 2 && _this.count == 3) {
        _this.Swiper(1);
        return false;
      }
      // 三张海报的时候
      if (_this.count == 3) {
        poster.trigger('3');
      }
      // 三张海报生成完成后
      if (_this.count == 4 && posterJson.bg.length == 3) {
        _this.Swiper(2);
      }
    });
  }
}
/** 
 * 生成二维码
 */
poster.createCode = function () {
  var url = posterJson.qrCodeUrl;
  // 设置参数方式
  if (!document.getElementById('qrcode')) {
    var qr = document.createElement("div");
    qr.id = "qrcode";
    document.body.appendChild(qr);
  }
  var qrcode = new QRCode('qrcode', {
    width: 256,
    height: 256,
    colorDark: '#000000', // 前景色
    colorLight: '#ffffff', // 背景色
    correctLevel: QRCode.CorrectLevel.M
  });

  // 使用 API
  qrcode.clear();
  // 设置二维码内容
  qrcode.makeCode(url);
}
/** 
 * 画二维码或小程序太阳码
 */
poster.DrawCode = function (ctx, i, callback) {
  var qrmain = document.getElementById("qrcode");
  var img = qrmain && qrmain.querySelector("img") || "";
  if (posterJson.xcxCode) {
    // 画太阳码
    var ng = new Image();
    ng.setAttribute("crossOrigin", 'Anonymous');
    ng.src = posterJson.xcxCode[i - 1];
    // console.log(ng);
    ng.onload = function () {
      ctx.drawImage(ng, 468, 1120, 162, 162);
      ctx.restore();
      callback();
    }
  } else {
    // 画二维码
    ctx.drawImage(img, 468, 1120, 162, 162);
    ctx.restore();
    callback();
  }
}
poster.listens = function (fn) {
  poster.list.push(fn);
}
poster.trigger = function () {
  for (var i = 0, fn; fn = this.list[i++];) {
    fn.apply(this, arguments);
  }
}
poster.ItemDom = function (arr) {
  var slides = '';
  for (var i = 0; i < arr.length; i++) {
    slides += '<div class="swiper-slide"><img src=""></div>';
  }
  var dom = document.createElement("div");
  var ohtml = '<div class="poser-mask" id="poserModel">' +
    '<div class="swiper-container">' +
    '<div class="swiper-wrapper">' + slides + '</div>' +
    '<div class="swiper-pagination"></div>' +
    '</div>' +
    '</div>';
  dom.innerHTML = ohtml;
  document.body.appendChild(dom);
}
poster.Swiper = function (num) {
  var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: num,
    loop: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 20,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  });
}
poster.listens(function (key) {
  if (key == 1 && this.count == 1) {
    this.init(key);
  }
});
poster.listens(function (key) {
  if (key == 2 && this.count == 2) {
    this.init(key);
  }
});
poster.listens(function (key) {
  if (key == 3 && this.count == 3) {
    this.init(key);
  }
});
poster.trigger('1');