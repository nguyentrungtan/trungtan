var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

console.log("server running");
var arrayUser = [];
var tontai = true;

io.sockets.on('connection', function(socket) {
	  console.log("Co nguoi connect ne");

	  socket.on('client-register-user',function(data){

	  	if (arrayUser.indexOf(data) == -1) {
	  		arrayUser.push(data);
	  		tontai = false;
	  		console.log(" Đăng ký thành công"+ data);
	  		socket.un = data;
	  		io.sockets.emit('server-send-user',{ danhsach : arrayUser });

	  	}else{
	  		console.log(" Đã tồn tại"+ data);
	  		tontai = true;

	  	}
	  	socket.emit('server-send-result',{ ketqua : tontai });
	  	
	  	//io.sockets.emit('server-send-data',{ noidung : data });
	  });

	  socket.on('client-send-chat',function(noiDung){
	  	console.log(socket.un + ":"+noiDung);
	  	io.sockets.emit('server-send-chat',{chatConent : socket.un + ":"+noiDung});

	  })


});
	
