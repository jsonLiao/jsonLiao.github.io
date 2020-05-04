var socket = io('http://localhost:3000')

var userName, avatar

$('#login_avatar li').on('click', function () {
    $(this).addClass('now').siblings().removeClass('now')

})
$('#loginBtn').on('click', function () {
    var userName = $('#username').val().trim()
    if (!userName) {
        alert('请输入用户名!')
        return
    }
    var avatar = $('#login_avatar li.now img').attr('src')
    // console.log('--', userName, avatar)
    socket.emit('login', {
        userName: userName,
        avatar: avatar
    })
})

// 监听登陆成功的请求
socket.on('loginSuccess', data => {
    // alert('登陆成功!')
    $('.login_box').fadeOut()
    $('.container').fadeIn()
    console.log('data====>', data)
    $('.avatar_url').attr('src', data.avatar)
    $('.info .username').text(data.userName)
    userName = data.userName
    avatar = data.avatar
})

// 监听登陆失败的请求

socket.on('loginError', data => {
    // alert('登陆失败!')
})
// /监听添加用户的消息
socket.on('addUser', data => {
    $('.box-bd').append(`
    <div class="system">
        <p class="message_system">
            <span class="content">"${data.userName}"加入了群聊</span>
        </p>
    </div>`)
    scrollIntoView()
})

// 监听用户列表的消息
socket.on('userList', data => {
    console.log('data==========', data)
    $('.user-list ul').html('')
    data.forEach(item => {
        $('.user-list ul').append(`
        <li class='user'>
            <div class='avatar'><img src='${item.avatar}'/></div>
            <div class='name'>${item.userName}</div>
        </li>
        `)
    });
    $('#userCount').text(data.length)
})
// 监听用户离开的信息
socket.on('delUser', data => {
    $('.box-bd').append(`
    <div class="system">
        <p class="message_system">
            <span class="content">"${data.userName}"离开了群聊</span>
        </p>
    </div>`)
    scrollIntoView()
})

$('.btn-send').on('click', function () {
    //获取聊天的内容
    // var content = $('#content').val().trim()
    var content = $('#content').html()
    $('#content').html('')
    // console.log('neir', content)
    if (!content) return alert('请输入内容!')
    socket.emit('sendMessage', {
        msg: content,
        userName: userName,
        avatar: avatar
    })
})
socket.on('receiveMessage', data => {
    //将消息显示到窗口中
    if (data.userName === userName) {
        console.log('自己的消息', data)
        //自己的消息
        $('.box-bd').append(`
        <div class="message-box">
            <div class="my message">
              <img class="avatar" src="${data.avatar}" alt="" />
              <div class="content">
                <div class="bubble">
                  <div class="bubble_cont">${data.msg}</div>
                </div>
              </div>
            </div>
          </div>`)
    } else {
        //别人的消息
        $('.box-bd').append(`
        <div class="message-box">
            <div class="other message">
              <img class="avatar" src="${data.avatar}" alt="" />
              <div class="content">
                <div class="nickname">${data.userName}</div>
                <div class="bubble">
                  <div class="bubble_cont">${data.msg}</div>
                </div>
              </div>
            </div>
          </div>`)
    }
    scrollIntoView()
})


function scrollIntoView() {
    // $('.box-bd').children(':last').get(0)表示获取DOM对象
    // $('.box-bd').children(':last').get(0).scrollIntoView(false) // false为当前元素的底部滚动到底部区域

    $('.box-bd').children(':last').get(0).scrollIntoView(false)
}

//发送图片的功能

$('#file').on('change', function () {
    var file = this.files[0]
    // 把这个文件发送给服务器
    var fr = new FileReader()
    fr.readAsDataURL(file) // 将这个文件读成base64的编码
    fr.onload = function () {
        console.log('fr读出来的结果', fr.result)
        socket.emit('sendImg', {
            userName: userName,
            avatar: avatar,
            img: fr.result
        })
    }
})

//监听图片聊天消息
socket.on('receiveImg', data => {
    //将消息显示到窗口中
    if (data.userName === userName) {
        console.log('自己的消息', data)
        //自己的消息
        $('.box-bd').append(`
        <div class="message-box">
            <div class="my message">
              <img class="avatar" src="${data.avatar}" alt="" />
              <div class="content">
                <div class="bubble">
                  <div class="bubble_cont">
                   <img src='${data.img}'>
                  </div>
                </div>
              </div>
            </div>
          </div>`)
    } else {
        //别人的消息
        $('.box-bd').append(`
        <div class="message-box">
            <div class="other message">
              <img class="avatar" src="${data.avatar}" alt="" />
              <div class="content">
                <div class="nickname">${data.userName}</div>
                <div class="bubble">
                  <div class="bubble_cont"><img src='${data.img}'/></div>
                </div>
              </div>
            </div>
          </div>`)
    }
    //等图片加载完成在滚动到底部
    $('.box-bd img:last').on('load', function () {
        scrollIntoView()
    })
})
$('.face').on('click', function () {
    $("#content").emoji({
        button: ".face",
        showTab: false,
        animation: 'slide',
        position: 'topRight',
        icons: [{
            name: "QQ表情",
            path: "../lib/jquery-emoji/img/qq/",
            maxNum: 91,
            excludeNums: [41, 45, 54],
            file: ".gif"
        }]
    });
})