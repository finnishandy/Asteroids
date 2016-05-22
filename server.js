/**
 * Created by finnishandy on 21/05/2016.
 */
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    asteroids = require('./src/asteroids');



app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('login', function(msg){
        var user = asteroids.findUser(msg.username);
        if (user && user.pwd === msg.pwd) {
            io.emit('login complete', asteroids.getAll(user.admin));
        } else {
            io.emit('Error', 'Invalid username & password');
        }
    });

    socket.on('register', function(msg){
        var user =  asteroids.findUser(msg.username);
        if (!user) {
            asteroids.insert('users', msg);
            io.emit('registration complete', true);
        } else {
            io.emit('Error', 'The username is in use');
        }

    });

    socket.on('insert', function(msg){
        data = {};
        if (msg.type === 'asteroids' || msg.type === 'groups') data.remainder = msg.name.toUpperCase().split('').reduce(asteroids.nameTotal, 0) % 45;
        var duplicate = asteroids.find(msg.type, {name: msg.name})
        if (!duplicate) {
            data.name = msg.name;
            asteroids.insert(msg.type, data);
            io.emit('update', asteroids.getAll());
        } else {
            io.emit('Error', 'Duplicate name');
        }

    });

    socket.on('update', function(msg){

        /*
        var remainder = msg.toUpperCase().split('').reduce(asteroids.nameTotal, 0) % 45;
        var duplicate = asteroids.find('asteroids', {name: msg})
        if (!duplicate) {
            asteroids.insert('asteroids', {name: msg, remainder: remainder});
            io.emit('update', asteroids.getAll());
        } else {
            io.emit('Error', 'duplicate asteroid name');
        }
        */
        asteroids.update(msg);
        io.emit('update', asteroids.getAll());
        console.log(JSON.stringify(msg));

    });

    socket.on('remove', function(msg){
        asteroids.remove(msg);
        io.emit('update', asteroids.getAll());
        console.log(JSON.stringify(msg));

    });

    socket.on('add group', function(msg){
        var remainder = msg.toUpperCase().split('').reduce(asteroids.nameTotal, 0) % 45;
        var duplicate = asteroids.find('groups', {name: msg})
        if (!duplicate) {
            asteroids.insert('groups', {name: msg, remainder: remainder})
            io.emit('update groups', asteroids.getAll());
        } else {
            io.emit('Error', 'duplicate group name');
        }
    });


    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});