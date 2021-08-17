const { SocketClient } = require('@cognigy/socket-client');

(async () => {
  // create a client instance with a socket url and an url token
  const client = new SocketClient(
    'https://endpoint-trial.cognigy.ai',
    '47846afb8b9c4b9538025b75e41e5902794d0df172a0b82710b654b71f2140a5',
    {
      // if you use node, internet explorer or safari, you need to enforce websockets
      forceWebsockets: true,
    }
  );

  // register a handler for messages
  client.on('output', (output) => {
    console.log('Text: ' + output.text + '   Data: ' + output.data);
  });

  // establish a socket connection (returns a promise)
  await client.connect().catch((err) => console.log(err));

  // send a message with text, text and data, data only
  client.sendMessage('hello there');
  console.log('hello');
})();
