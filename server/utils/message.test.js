var expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', ()=>{
    it('should generate the correct message object', () => {

      var name = 'John';
      var text = 'This is some test text';
      var message = generateMessage(name, text);

      // expect(message.from).toBe(name);
      // expect(message.text).toBe(text);
      expect(message).toInclude({
        from: name,
        text
      });
      expect(message.createdAt).toBeA('number');
    });
});
