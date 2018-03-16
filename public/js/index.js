
  var socket = io();
  socket.on('connect', function() {
    console.log('Connected to server');

  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(msg) {
    console.log('New Message', msg);

    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery("#messages").append(li);
  });

  socket.emit('createMessage', {
    from:'Apc',
    text:'Hello'
  }, function(data) {
    console.log('Got it ', data);
  });

  jQuery("#message-form").on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
    }, function() {

    });
  });
