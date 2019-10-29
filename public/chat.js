(document.load = function(){
    let socket = io.connect('http://localhost:3200/');

    let message =document.getElementById('message');
    let username = document.getElementById('username');
    let send_message = document.getElementById('send_message');
    let send_username = document.getElementById('send_username');
    let chatroom = document.getElementById('chatroom');

    send_username.addEventListener('click', function(){
        console.log(username.value);
        socket.emit('change_username',{username: username.value})
    });

    send_message.addEventListener('click', function(){
        socket.emit('new_message', {message: message.value})
    })

    socket.on('new_message', (data) => {
        const p = document.createElement('p');
        p.className= "message"
        p.textContent = data.username + ": " + data.message;
        chatroom.append(p)


    })
    socket.on('typing', (data) => {

            const el = document.getElementById('feedback')
                el.innerHTML = "";

                const feedback = document.createElement('p');
                feedback.id = "childFeed"
                feedback.innerHTML = '<i>' + data.username + ' is typing a message...' + '</i>'
                el.appendChild(feedback);

                setTimeout(() => el.removeChild(feedback), 500)
    })

    socket.on('typing_end', (data) => {
        const el = document.getElementById('feedback'),
        feed = document.getElementById('childFeed');
        if(el.innerHTML !==""){
            el.removeChild(feed)
        }
    })
  
    message.addEventListener('keydown', () => {
         socket.emit('typing_end');

    })
           
    message.addEventListener('keyup', (e) =>{
        console.log(e.target.value)
        socket.emit('typing');
    })

})()