$(function () {
  progressLoading();
  // 淫贱的阻止页面选中效果
  document.onmousedown = function () {
    document.onmousemove = function () {
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
  }
  document.onmouseup = function () {
    document.onmousemove = null;
  }

  // window.onbeforeunload = function (e) {
  //   e = e || window.event;
  //   if (e) {
  //     var oUrl = document.location.href;
  //     var newUrl = oUrl.substring(0, oUrl.indexOf("#"));
  //     history.pushState(null, null, newUrl);
  //   }
  // };

  var $container = $('.portfolio-items');
  setTimeout(function () {
    $container.isotope({
      itemSelector: '.portfolio-items > div',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
  }, 1000);

  $('#resume').fullpage({
    sectionsColor: ['transparent', 'transparent', '#e4e4e4', 'rgba(255, 255, 255, .0)', 'transparent', 'transparent'],
    scrollingSpeed: 700,
    // 是否首尾相接
    continuousVertical: false,
    normalScrollElementTouchThreshold: 5,
    // 导航条显示
    navigation: true,
    // 内容超出后是否出现滚动条
    scrollOverflow: false,
    // // 左右滑块循环
    loopHorizontal: false,
    // 左右滑块颜色
    controlArrowColor: '',
    // 导航栏设置
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
    menu: '#menu',
    easing: 'easeInOut',
    // 页面渲染后回调
    afterRender: function () {
      // page4 透明背景
      $('item-4').css('background', 'rgba(255, 255, 255, .1)');
      //侧边导航事件
      var Tooltips = ['个人简历', '基本资料', '专业技能', '工作经历', '项目经验', '自我评价'];
      $("#fp-nav ul li").each(function (index) {
        this.dataset['toggle'] = 'tooltip';
        this.dataset['placement'] = 'left';
        $(this).attr('title', Tooltips[index])
      })
      $('[data-toggle="tooltip"]').tooltip();

      // 顶部导航栏自动会拉事件
      if ($('.navbar-toggle').css('display') == 'block') {
        $('.navbar-collapse li').on('click', function () {
          $('.navbar-toggle').trigger('click');
        });
      }
      $('#fp-nav').addClass('hidden-xs');
      // 为了避免标签太多同一时间加载的话在刚载入页面时候产生怪异感，所有动画元素初始都是hidden的

      $('.item-1 .next-page').on('click', function () {
        $.fn.fullpage.moveSectionDown();
      });
      setTimeout(function () {
        $('.item-1 .corner').show();
        $('.resume-hide').show();
      }, 500);
    },

    // 滚动触发后结束前回调
    onLeave: function (index, nextIndex, direction) {
      if (nextIndex == 4) {
        $('.pure').hide();
        $('.sky').show();
      }
      if (nextIndex == 6) {
        $('.sky').hide();
      } else {
        $('.item-6 .top').animate({
          'height': '50%'
        }, 400);
        $('.item-6 .foot').animate({
          'height': '50%'
        }, 400);
      }
      switch (index) {
        case 1:
          $('.item-1 .corner').hide();
          $('.resume-hide').hide();
          $('.navbar').removeClass('black');
          break;
        case 2:
          if (direction == 'down') {
            $('.item-2 .icon-infomation').addClass('zoomOutUp');
            setTimeout(function () {
              $('.item-2 .icon-infomation').removeClass('zoomOutUp');
              $('.item-2 .container').hide();
            }, 500);
          } else {
            $('.item-2 .container').hide();
          }
          break;
        case 3:
          $('.item-3 .container').hide();
          $('.navbar').removeClass('blue');
          break;
        case 4: {
          $('.item-4 .container').hide();
          break;
        }
        case 6: {
          break;
        }
      }
    },
    // 滚动结束后回调
    afterLoad: function (anchorLink, index) {
      if (index == 6) {
        $('.pure').show();
      }
      switch (anchorLink) {
        case 'page1':
          $('.item-1 .corner').show();
          $('.resume-hide').show();
          $('.navbar').addClass('black');
          break;
        case 'page2':
          $('.item-2 .container').show();
          break;
        case 'page3':
          $('.navbar').addClass('blue');
          $('.item-3 .container').show();
          break;
        case 'page4':
          $('.item-4 .container').show();
          break;
        case 'page5':
          break;
        case 'page6':
          setTimeout(function () {
            $('.item-6 .top').animate({
              'height': '16%'
            }, 400);
            $('.item-6 .foot').animate({
              'height': '16%'
            }, 400);
          }, 500)
          break;
      }
    },
    // 水平滑块回调
    onSlideLeave: function (anchorLink, index, slideIndex, direction) {},
    // 水平滑块回调
    afterSlideLoad: function (anchorLink, index, slideIndex) {}
  })

  var oopts = {
      textFont: 'Impact,Arial Black,sans-serif',
      textHeight: 20,
      maxSpeed: 0.1,
      decel: 0.9,
      depth: 0.99,
      outlineColour: '#f6f',
      outlineThickness: 6,
      pulsateTo: 0.2,
      pulsateTime: 0.5,
      wheelZoom: false
    },
    ttags = 'taglist',
    lock = 'x',
    shape = 'hcylinder';

  TagCanvas.textFont = 'Trebuchet MS, Helvetica, sans-serif';
  TagCanvas.textColour = '#222';
  TagCanvas.textHeight = 25;
  TagCanvas.outlineMethod = 'block';
  TagCanvas.outlineColour = '#434bf0';
  TagCanvas.maxSpeed = 0.03;
  TagCanvas.minBrightness = 0.2;
  TagCanvas.depth = 0.92;
  TagCanvas.pulsateTo = 0.8;
  TagCanvas.initial = [0, 0.2];
  TagCanvas.decel = 0.98;
  TagCanvas.reverse = true;
  TagCanvas.hideTags = false;
  TagCanvas.shadow = '#ccf';
  TagCanvas.shadowBlur = 3;
  TagCanvas.weight = false;
  TagCanvas.imageScale = null;
  TagCanvas.fadeIn = 1000;
  TagCanvas.clickToFront = 600;
  try {
    TagCanvas.Start('tagcanvas', 'taglist');
    TagCanvas.Start('smallCanvas', 'moreTags', oopts);
    f('options');
  } catch (e) {

  }
  playAudio();

  // bootstrap下拉事件监听
  $('#bs-example-navbar-collapse-1').on('show.bs.collapse', function () {
    // console.log("展开");
    $("#navbar").addClass("active");
  })
  $('#bs-example-navbar-collapse-1').on('hide.bs.collapse', function () {
    // console.log("收起");    
    $("#navbar").removeClass("active");
  })
})