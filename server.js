
var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 3000;

app.listen(PORT);

// 定义事件委托
var bindListener = function (socket, event) {
    // 监听客户端发送的信息
    socket.on(event, function (data) {
        // 给该socket客户端发送信息
        socket.emit(event, data);
        // 给所有客户端广播消息
        io.sockets.emit('all-' + event, data);
    });
};

// 监听客户端连接，回调函数会传递本次连接的socket
io.on('connection', function (socket) {
    // 事件转发
    bindListener(socket, 'login');
    bindListener(socket, 'send');
});

console.log('web socket listening on port : ' + PORT);



















