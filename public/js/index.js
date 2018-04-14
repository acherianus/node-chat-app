
  var socket = io();
  socket.on('connect', function() {
    console.log('Connected to server');

  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(msg) {
    console.log('New Message', msg);

    var template = jQuery("#message-template").html();
    var formattedTime = moment().format('h:mm a');
    var html = Mustache.render(template, {
      text : msg.text,
      from : msg.from,
      createdAt : formattedTime
    });

    jQuery("#messages").append(html);
    // var li = jQuery('<li></li>');
    // li.text(`${msg.from}: ${msg.text}`);
    //
    // jQuery("#messages").append(li);
  });

  socket.on('newLocationMessage', function(msg) {
    console.log('New Location Message', msg);
    var template = jQuery("#location-message-template").html();
    var formattedTime = moment().format('h:mm a');
    var html = Mustache.render(template, {
      url : msg.url,
      from : msg.from,
      createdAt : formattedTime
    });

    jQuery("#messages").append(html);

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${msg.from}: `);
    // a.attr('href', msg.url);
    // li.append(a);
    //
    // jQuery("#messages").append(li);
  });

  socket.emit('createMessage', {
    from:'Apc',
    text:'Hello'
  }, function(data) {
    console.log('Got it ', data);
  });

  jQuery("#message-form").on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function() {
      messageTextBox.val('');
    });
  });

  var locationButton = jQuery('#send-location');
  locationButton.on('click', function() {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...')
    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
  });
