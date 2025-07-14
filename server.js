const express = require('express')
const path = require('path')
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/api/lanches', (req, res) => {
    const lanches = require('./public/data/lanches.json')
    res.json(lanches)
})
app.get('/sugestao', (req, res) => {
    const nome = req.query.nome
    const ingredientes = req.query.ingredientes
    res.send(`
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
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});


