const express = require('express');
const wppconnect = require('@wppconnect-team/wppconnect');
const port = process.env.PORT || 3000; // Porta configurável
const host = '0.0.0.0'; // Escuta em todas as interfaces

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Iniciar o wppconnect e configurar o servidor
async function startServer() {
  try {
    // Criar o cliente do wppconnect
    const client = await wppconnect.create();

    // Função para encontrar o grupo pelo nome
    async function findGroupByName(name) {
      const groups = await client.getAllGroups();
      console.log("todos os grupos", groups)
      return groups.find(group => group.contact.name === name);
    }

    // Rota para enviar mensagem para um grupo pelo nome
    app.post('/sendGroupMessage', async (req, res) => {
      const { groupName, message } = req.body;

      if (!groupName || !message) {
        return res.status(400).json({ error: 'Parâmetros groupName e message são obrigatórios.' });
      }

      try {
        // Encontrar o grupo pelo nome
        const group = await findGroupByName(groupName);

        if (!group) {
          return res.status(404).json({ error: `Grupo '${groupName}' não encontrado.` });
        }

        // Enviar a mensagem para o grupo encontrado
        const result = await client.sendText(group.id._serialized, message);
        console.log(`Mensagem enviada para o grupo '${groupName}'. Resultado:`, result);

        // Retornar sucesso
        res.status(200).json({ success: true, result });

      } catch (error) {
        console.error('Erro ao enviar mensagem para o grupo:', error);
        res.status(500).json({ success: false, error: 'Erro ao enviar mensagem para o grupo.' });
      }
    });

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
    app.listen(port, host , () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

// Iniciar o servidor
startServer();
