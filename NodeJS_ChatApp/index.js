var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ent = require('ent'); // Blocks HTML characters (security equivalent to htmlentities in PHP)
var mysql = require('mysql'); // include thêm module mysql

// Tạo kết nối với Database
var pool = mysql.createPool({
host: '172.19.0.2',
user: 'testuser1',
password: '123456',
database: 'test'
});

app.get('/user', function(req, res){
    // Viết câu truy vấn sql
    var sql = 'SELECT * FROM `member`';// Thực hiện câu truy vấn và show dữ liệu
    pool.query(sql, function(error, result){
        if (error) throw error;
        console.log('– USER TABLE — ' , result);
        res.json(result); // Trả kết quả về cho client dưới dạng json
    });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/error', function(req, res){
  res.sendFile(__dirname + '/error.html');
});

io.on('connection', function(socket, username){
    
    // When the username is received it’s stored as a session variable and informs the other people
    socket.on('new_client', function(username) {
        username = ent.encode(username);
        
        if (username === '' ){
            var destination = '/';
            socket.emit('redirect', destination);
        } else{
             var sql = "SELECT * FROM `member` WHERE account = '" + username + "' AND password = '" + 123456 + "'";// Thực hiện câu truy vấn và show dữ liệu
        
            pool.query(sql, function(error, result){
                if(result.length === 0 || error) {
                    var destination = '/error';
                    socket.emit('redirect', destination);
                } else {
                    console.log('– MEMBER — ' , result[0]);
                    socket.username = username;
                    socket.broadcast.emit('new_client', username); 
                }  
            });
        }
    });
    
  socket.on('chat_message', function(message){
    message = ent.encode(message);
    io.emit('chat_message', {username: socket.username, message: message});
  });
  
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

