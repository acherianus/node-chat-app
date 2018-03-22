var expect = require('expect');

var {generateMessage, generateLocationMessage} = require("./message");

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Apc';
    var text = 'my message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    var from = 'Apc';
    var longitude = 2;
    var latitude = 1;
    var message = generateLocationMessage(from, latitude, longitude);

    var expectedUrl = `https://www.google.com/maps/?q=${latitude},${longitude}`;

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url:expectedUrl});
  });
});
