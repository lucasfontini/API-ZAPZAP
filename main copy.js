const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create()
  .then((client) => {
    start(client);
    send(client, '554196598871@c.us'); // Example usage of send function
    const result = client.sendText(number, '👋 Prezados, quero abrir um chamado com o cliente');
    console.log('Result: ', result); // return object success
  })
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hello') {
      client
        .sendText(message.from, 'Hello, how may I help you?')
        .then((result) => {
          console.log('Result: ', result); // return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); // return object error
        });
    }
  });
}

 

 
 
