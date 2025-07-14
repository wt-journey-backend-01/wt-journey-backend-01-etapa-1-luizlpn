const express = require('express')
const path = require('path')
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/contato', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'))
});

app.get('/api/lanches', (req, res) => {
    const lanches = require('./public/data/lanches.json')
    res.status(200).json(lanches)
})
app.get('/sugestao', (req, res) => {
    const nome = req.query.nome
    const ingredientes = req.query.ingredientes
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Agradecimento</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="container mt-5">
        <h1 class='bg-primary text-white p-3'>Obrigado pela sugestão!</h1>
            <div class="mt-4">
                <p><strong>Hambúrguer:</strong> ${nome}</p>
                <p><strong>Ingredientes:</strong> ${ingredientes}</p>
            </div>
            <a href="/" class="btn btn-primary mt-3">Voltar ao cardápio</a>
        </body>
        </html>
        `
    )
})

app.use(express.urlencoded({ extended: true }));

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensaegem } = req.body
    
    const params = new URLSearchParams({
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem

    });
    res.status(200).redirect(`/contato-recebido?${params.toString()}`)
})

app.get('/contato-recebido', (req, res) => {
    res.send(
        `
       <!DOCTYPE html>
    <html>
    <head>
      <title>Confirmação</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="container mt-5">
      <h1 class="text-success">Contato recebido!</h1>
      
      <div class="card mt-4">
        <div class="card-body">
          <h5>Dados recebidos:</h5>
          <p><strong>Nome:</strong> ${req.query.nome} </p>
          <p><strong>E-mail:</strong> ${req.query.email} </p>
          <p><strong>Assunto:</strong> ${req.query.assunto} </p>
          <p><strong>Mensagem:</strong> ${req.query.mensagem} </p>
        </div>
      </div>

      <a href="/" class="btn btn-primary mt-3">Voltar</a>
    </body>
    </html>
    `
    )
})
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});



