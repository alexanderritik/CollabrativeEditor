const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')
const {adduser,removeuser,getuser,getUserInRoom,editorcontent,getcontent}=require('./utils/user.js')
const {genratemessage}=require('./utils/message.js');


const app=express()

const server=http.createServer(app)


// here socket io called the server now our server supposr socket
const io=socketio(server)

// this is used in herouk to provide the port by heroku 
// const port=process.env.PORT || 3000;
const port=3000;
const publicdirectorypath=path.join(__dirname,'../public')


// it contains the static page
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
res.sendFile('index.html')
})


// connection is the name of event it fires when soocket io get new connection
// it is provide by socket si donot change name
io.on('connection',(socket)=>{  

	// console.log(socket);

	socket.on('sendmsg',(msg,callback)=>{
		// console.log(msg);
		const user=getuser(socket.id);
		// console.log(user);

		// this is used to send message to all member of taht room
		if(user)
		{
			io.to(user.room).emit('recivemsg',genratemessage(user.username,msg));
		}

		callback()
	})

	socket.on('disconnect',()=>{
		// when the client leave the room 
		const user=removeuser(socket.id)
		
		if(user)
		{
			io.to(user.room).emit('message',genratemessage(`${user.username} has left!`));
			
			// it update the member in the room
			io.to(user.room).emit('roomData',{
				room:user.room,
				users:getUserInRoom(user.room)
			})
		}
	})

	socket.on('join',({username,room},callback)=>{
		// console.log('username - ',username);
		const {error,user}=adduser({id:socket.id , username , room})
		if(error)
		{
			return callback(error);
		}
		// this is used to join the particular room
		socket.join(user.room);

		// it is sent to every one in any room
		socket.emit('message',genratemessage("Admin Ritik  welcome to the app"))
		// it is send to every user in that particular room except that user who is sgining
		socket.broadcast.to(user.room).emit('message',genratemessage(`${user.username} has joined!`)) 
	
		// it send how many member present in the room
		io.to(user.room).emit('roomData',{
			room:user.room,
			users:getUserInRoom(user.room)
		})
		
		callback();
	})

	socket.on('texteditor' , ({username,room ,content},callback) =>{
		// console.log(username," ",room);
		// console.log(content);

		// this is used store the content of editor in one array
		editorcontent({room , content});

		// console.log(getcontent(room));

		// this is used to sent to clent js the content of editor
		socket.broadcast.to(room).emit('textcontent',getcontent(room))

		callback();
	})

	

})


server.listen(port,()=>{
	console.log('We start the post a port')
})
