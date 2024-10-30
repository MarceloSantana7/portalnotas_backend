const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/dados', async (req, res) => {
    const { periodoInicial, periodoFinal, empresa, tipoLista } = req.query; // Supondo que esses dados venham como query params

    try {
        const url = `https://baelos3.dcfiorilli.com.br:879/transparencia/versaoJson/Despesas/?Listagem=DespesasporExigibilidade&DiaInicioPeriodo=${periodoInicial}&DiaFinalPeriodo=${periodoFinal}&strTipoLista=${tipoLista}&Empresa=${empresa}`;

        const response = await axios.get(url);
        res.json(response.data); // Envia os dados da API externa de volta ao cliente
    } catch (error) {
        console.error('Erro ao fazer requisição à API externa:', error);
        res.status(500).send('Erro ao obter dados');
    }
});