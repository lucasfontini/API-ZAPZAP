const express = require('express');
const wppconnect = require('@wppconnect-team/wppconnect');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Iniciar o wppconnect
let client;
wppconnect
  .create()
  .then((cli) => {
    client = cli;
    start(client);
    console.log('WPPConnect iniciado');
  })
  .catch((error) => console.log(error));

// Função para gerenciar mensagens recebidas
function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hello') {
      client
        .sendText(message.from, 'Hello, how may I help you?')
        .then((result) => {
          console.log('Result: ', result);
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro);
        });
    }
  });
}

// Rota para enviar mensagens
app.post('/send', (req, res) => {
  const { number, message } = req.body;
  if (!number || !message) {
    return res.status(400).send({ error: 'Número e mensagem são obrigatórios' });
  }

  client
    .sendText(number, message)
    .then((result) => {
      res.status(200).send({ success: true, result });
    })
    .catch((erro) => {
      res.status(500).send({ success: false, error: erro });
    });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
