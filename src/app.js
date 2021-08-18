import React, { useState } from 'react';
const { SocketClient } = require('@cognigy/socket-client');
// create a client instance with a socket url and an url token

const App = () => {
  const [messageArray, pushMessageArray] = useState([]);
  // const [message, setMessage] = useState('');
  const [myinput, setMyInput] = useState('');
  const client = new SocketClient(
    'https://endpoint-trial.cognigy.ai',
    '47846afb8b9c4b9538025b75e41e5902794d0df172a0b82710b654b71f2140a5',
    {
      // if you use node, internet explorer or safari, you need to enforce websockets
      forceWebsockets: true,
    }
  );
  const sendMessage = async (message) => {
    // establish a socket connection (returns a promise)
    await client.connect().catch((err) => console.log(err));

    // register a handler for messages
    client.on('output', (output) => {
      // setMessage(output.text);
      pushMessageArray([
        ...messageArray,
        { id: 'human', output: message },
        { id: 'ai', output: output.text },
      ]);
    });

    // send a message with text, text and data, data only

    client.sendMessage(message);
  };

  const handelSubmit = () => {
    setMyInput('');
    pushMessageArray([...messageArray, { id: 'human', output: myinput }]);
    sendMessage(myinput);
  };

  const handelChange = (e) => {
    setMyInput(e.target.value);
  };

  const handlekey = (e) => {
    if (e.key === 'Enter') {
      setMyInput('');
      pushMessageArray([...messageArray, { id: 'human', output: myinput }]);
      sendMessage(myinput);
    }
  };

  return (
    <div className='container'>
      <div className='history'>
        {messageArray.length === 0
          ? null
          : messageArray.map((item) =>
              item.id === 'human' ? (
                <div className='human-text'>
                  <h4>{item.output}</h4>
                </div>
              ) : (
                <div className='ai-text'>
                  <h4>{item.output}</h4>
                </div>
              )
            )}
      </div>
      <div className='formInput'>
        <input
          type='text'
          onChange={handelChange}
          onKeyDown={handlekey}
          value={myinput}
        ></input>
        <button onClick={handelSubmit}>Send</button>
      </div>
    </div>
  );
};

export default App;
