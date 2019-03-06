const socket = io();

function showStatus(status, message) {
  document.querySelector('[data-status]').innerHTML = message || status;
  document.querySelector('[data-status]').setAttribute('data-status', status);
}

socket
  .on('error', function(message) {
    console.error(message);
    showStatus('error', message);
  });

//system messages
'connect disconnect reconnect reconnecting reconnect_failed'.split(' ').forEach(function(event) {
  socket.on(event, function() {
    showStatus(event);
  })
});
' disconnect reconnect_failed'.split(' ').forEach(function(event) {
  socket.on(event, function() {
    socket.disconnect();
    showStatus(event);
  })
});

socket.on('logout', function() {
  socket.disconnect();
  window.location.reload();
});

window.addEventListener('DOMContentLoaded', () => {
  //remove internal flash messages
  let alert = document.querySelector('.alert');  
  if (alert) {
    setTimeout (()=>{
      document.querySelector('div.alert-messages').innerHTML = '';
    }, 3000);
  }

  document.addEventListener('click', (event) => {
console.log('click');
    let target = event.target;
    let logout = target.closest('.logout');
    if(logout) {
      console.log('logout');
    }
  })  



//take value from radioButton
  document.querySelector('.submitMessageForm').onsubmit = function (e) {

/*    const chatRoom = document.querySelector('input[name="room"]:checked').value;*/
    const chatRoom = document.querySelector('.chatroom').textContent;
console.log(chatRoom);
      e.preventDefault(); // prevents page reloading
      if(m.value) {
        socket.emit('client message', {
          message: m.value,
          chatRoom: chatRoom
          });
        m.value = '';
        return false; 
      }

    };

  // receive messeges from server to client <==
  socket.on('message', (m) => {
  let value;

    if(typeof m === 'object') {
console.log(m);
      value =  `<p class="item"><span class="user">${m.user} : </span><span class="msg">${m.message}</span>
      <span class="date">${m.date}</span></p>`;
    } else {

      value =  `<p class="item"><span class="system">${m}</span></p>`;
    }

    let li = document.createElement("LI"); 
    li.innerHTML = value;
    document.querySelector('.messages').append(li);
  })

});
