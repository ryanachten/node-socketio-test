var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', ()=>{
    it('should generate the correct message object', () => {

      var name = 'John';
      var text = 'This is some test text';
      var message = generateMessage(name, text);

      expect(message).toInclude({
        from: name,
        text
      });
      expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', ()=>{
  it('should generate the correct location object', ()=>{

    var name = 'Jane';
    var lat = -10;
    var long = 20;
    var url = `https://www.google.com/maps?q=${lat},${long}`;

    var message = generateLocationMessage(name, lat, long);

    expect(message).toInclude({
      from: name,
      url: url
    });
  });
});
