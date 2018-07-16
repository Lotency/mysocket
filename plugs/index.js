
new Vue({
    el: '#app',
    data: {
        user_name: '',
        input_msg: '',
        hit: '',
        socket: null,
        web_msg: []
    },
    methods: {
        send: function () {
            var vm = this;
            console.log(vm.socket);
            // 向服务器发送消息
            vm.socket.emit('send', { name: vm.user_name, msg: vm.input_msg });
        }
    },
    mounted: function () {
        var vm = this;
        vm.$nextTick(function () {
            // 建立连接
            var socket = io('ws://localhost:3000');
            vm.socket = socket;
            socket.emit('login', {});
            // 监听服务消息
            socket.on('login', function () {
                vm.hit = '在线';
            });
            // 监听服务器广播信息
            socket.on('all-send', function (data) {
                vm.web_msg.push(data);
            });
        });
    }
});
















