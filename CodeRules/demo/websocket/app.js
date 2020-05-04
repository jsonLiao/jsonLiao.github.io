var app = require('express')() //一个函数
var server = require('http').Server(app) //用expres创建的图片
var io = require('socket.io')(server)

server.listen(3000, _ => {
    console.log('服务器启动成功了----')
}) //启动了服务

app.use(require('express').static('public'))
const users = []
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.redirect('/index.html')
})
io.on('connection', socket => {
    console.log('用户链接了')
    socket.emit('send', { // 发送数据很简单 只要emit一下某个事件 事件名字可以在接收端自己随便定义用on()接收,
        msg: '这个是服务向客户端发送的消息'
    })
    socket.on('login', data => {
        console.log('这个是浏览器发送给服务器的数据--->', data)
        let user = users.find(item =>
            item.userName === data.userName
        )
        if (user) {
            socket.emit('loginError', {
                msg: '登陆失败!'
            })
            console.log('登陆失败')
        } else {
            console.log('登陆成功')
            users.push(data)
            socket.emit('loginSuccess', data)
            //登陆成功,广播所有人,socket.emit()告诉当前用户io.emit()广播事件
            io.emit('addUser', data)
            // 告诉所有用户目前群里有多少人
            io.emit('userList', users)

            //把登陆成功的用户名和头像存起来
            socket.userName = data.userName
            socket.avatar = data.avatar
        }
    })
    // 监听用户断开链接的事件
    socket.on('disconnect', () => {
        //把断开的用户的信息从users中删除,
        let idx = users.findIndex(item => {
            item.userName === socket.userName
        })
        users.slice(idx, 1)
        // 1.告诉所有人有人离开了,
        io.emit('delUser', {
            userName: socket.userName,
            avatar: socket.avatar
        })
        // 2.告诉所有人userList发送了更新
        io.emit('userList', users)
    })
    //接收消息
    socket.on('sendMessage', data => {
        console.log('dat=------------', data)
        io.emit('receiveMessage', data)
    })
    //接收图片
    socket.on('sendImg', data => {
        console.log('dat=------------', data)
        io.emit('receiveImg', data)
    })
})