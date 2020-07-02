// here we maintain the users data like room id and username
// we also maintain a master with one who create the room

users=[];
texteditor=[];

const adduser=({id,username,room})=>{

    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()
    
    // validate the data
    if(!username || !room)
    {
        return {
            error:"Username and room are required!"
        }
    }

    const existinguser=users.find((user)=>{
        return  user.username===username && user.room===room
    })

    if(existinguser)
    {
        // console.log('Username is already prseent in the room')
        return {
            error:"Username is already prseent in the room"
        }
    }

    const user={id,username,room}
    users.push(user)
    // console.log(users);
    return {user}
}



const getuser=(id)=>{

    const index=users.findIndex((user)=>{
        return (user.id===id)
    })
    // console.log(index);

    if(index===-1)
    {
       return undefined
    }
    
    return users[index]
}


const getUserInRoom=(room)=>{
    const roomuser=[];
    users.find((user)=>{
        if(user.room===room)
        {
            roomuser.push(user);
        }
    })
    // console.log(roomuser)
    return roomuser;
}



const removeuser=(id)=>{

    const index=users.findIndex((user)=>{
        return user.id===id;
    })

    if(index!==-1)
    {
        // it return an array and splice method reove user from that index and
        // 1 menas only one user
       return  users.splice(index,1)[0]  ;
    }
    
}


const editorcontent=({room,content})=>{
    
    const index=texteditor.findIndex((text)=>{
            return text.room === room     
    })

    if(index!==-1)
    {
        texteditor.splice(index,1)[0] ; 
    }
    const data={room,content}
    return texteditor.push(data);
    // console.
    
    // log(texteditor);
}

const getcontent=(room)=>{
    // console.log(' user ',room);
    // console.log(texteditor)
    let output;
    texteditor.find((data)=>{
        // console.log(data.room)
        if(data.room === room)
        {
            output=data.content  ; 
        }
        
    })
    return output;

}

module.exports={
    adduser,
    removeuser,
    getuser,
    getUserInRoom,
    editorcontent,
    getcontent
}


// adduser({
//     id:1,
//     username:"alexander",
//     room:"Mrj"
// })
// adduser({
//     id:2,
//     username:"alexander",
//     room:"Mrj1"
// })

// getUserInRoom('mrj')
// removeuser(1)

// editorcontent({
//     room:"mrj",
//     content:"hello everyone"
// })

// editorcontent({
//     room:"mrj1",
//     content:"hello motehr"
// })

// editorcontent({
//     room:"mrj1",
//     content:"hello bye"
// })