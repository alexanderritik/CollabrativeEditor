var socket=io()

editor.document.designMode = "On";
function transform(option, argument) {
  editor.document.execCommand(option, false, argument);
}



const messagebutton=document.getElementById('check')
const sidebar=document.getElementById('mySidenav');
const message=document.getElementById('message');
const checklive=document.getElementById('checkLive');

let status;
checklive.onchange=(e)=>{
    const value=checklive.value;
    if(value==="offline")
    {
        status=1;
        checklive.value="online"
    }
    else{
        status=0;
        checklive.value="offline"
    }
    console.log(status);
}



const sidebarTemplate=document.getElementById('sidebar-template').innerHTML
const messageTemplate=document.getElementById('message-template').innerHTML

const {username,room}=Qs.parse(location.search , {ignoreQueryPrefix:true})


socket.on('welcome',()=>{
    console.log('welcome client')
})

const autoscroll=()=>{
    // new messagge by of message div
    const newmessage=message.lastElementChild

    // get the hegiht of new message
    // we do not hard card how so ever we know the style padding sinceif we change that
    // then auto scrolling do not work
    const newmessagestyle=getComputedStyle(newmessage)
    
    // here we get the margin bottom of newmessagestyle
    const newmessagemargin=parseInt(newmessagestyle.marginBottom)
    const newmessageheight=newmessage.offsetHeight+newmessagemargin
    // console.log(newmessagemargin)

    // visble height
    const visbleheight=message.offsetHeight
    
    // height of message container
    const containerheight=message.scrollHeight

    // how far i scroll and add scrollbar height
    const scrolloffset=message.scrollTop+visbleheight

    // console.log(containerheight , newmessageheight , scrolloffset)
    if(containerheight-newmessageheight <= scrolloffset)
    {
        message.scrollTop=message.scrollHeight
    }
}



// for sending message 
document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    messagebutton.setAttribute('disabled','disabled')
    const msg=document.getElementById('msg').value
    document.getElementById('msg').value='';
    document.getElementById('msg').focus()
    // console.log(msg)
    socket.emit('sendmsg',msg,()=>{
        messagebutton.removeAttribute('disabled')     
    })
})


// for text content editor to server
editor.document.addEventListener('keyup', getTextEditor, true);
function getTextEditor () {
    var content= editor.document.body.innerHTML;
    // console.log(content);
    if(status===0){
    socket.emit('texteditor',({username,room , content}),(error)=>{
        if(error)
        {
            alert(error)
            location.href='/';
        }
    })   
    } 
}


//thi is used to change the editor content
    socket.on('textcontent',(text)=>{
        // console.log(text);
        if(status===0)
        editor.document.body.innerHTML =text;
    })




// for joining to room
socket.emit('join' ,({username , room}) , (error)=>{
    if(error)
        {
            alert(error)
            location.href='/';
        }
})

let id=0;

// for any type of message 
socket.on('message',(msg) =>{
    // console.log(text);
    const html=Mustache.render(messageTemplate,{
        id:id,
        text:msg.text,
        username:msg.username,
        time:moment(msg.createdAt).format('h:mm a')})

        message.insertAdjacentHTML('beforeend',html)

        autoscroll();
        
        $('#'+id).addClass("highlight");
        setTimeout(function () {
            $('#YourElement').removeClass('highlight');
        }, 2000);
        id+=1;
        
        
})


// for recieve message
socket.on('recivemsg',(msg)=>{
    // console.log(msg)
    const html=Mustache.render(messageTemplate,{
        id:id,
        text:msg.text,
        username:msg.username,
        time:moment(msg.createdAt).format('h:mm a')})
        
        message.insertAdjacentHTML('beforeend',html)

        autoscroll();

        $('#'+id).addClass("highlight");
        setTimeout(function () {
            $('#YourElement').removeClass('highlight');
        }, 2000);
        id+=1;
        
})


// print all memeber prsent in that room
socket.on('roomData',({room, users})=>{
    // console.log('room data ' , room );
    // console.log('room user' , users)

    const html=Mustache.render(sidebarTemplate,{
        room,
        users
    })
    id+=1;
    sidebar.innerHTML=html;
})




  // here is work for side bar 
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";    
  }
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.content = "center";
  }



// it is used for screenn to hide chatbox on screen
  var screensize = document.documentElement.clientWidth;
  if (screensize  < 400) {
    //  alert('Less than 400');
    $('#chatbox').css('display','none');
     $('#main').removeClass('col-9');
      $('#main').addClass('col-12');
      $('#chatbox').removeClass('col-3');   
  }

  





