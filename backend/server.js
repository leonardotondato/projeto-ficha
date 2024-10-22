const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());


// Configurar a conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'adpass',
    port: 5432,
});

app.use(express.json());
app.use(express.static('public'));

// Endpoint para salvar dados
app.post('/save-data', async (req, res) => {
    const { charName, race, classe, background, level, str_score, dex_score, con_score, int_score, wis_score, cha_score } = req.body;
    try {
        const result = await pool.query('INSERT INTO charactersheet (char_name, race, classe, background, level, str_score, dex_score, con_score, int_score, wis_score, cha_score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [charName, race, classe, background, level, str_score, dex_score, con_score, int_score, wis_score, cha_score]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar os dados.' });
    }
});

// Endpoint para buscar todos os dados
app.get('/get-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, char_name FROM charactersheet');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar os dados.' });
    }
});

// Endpoint para buscar dados específicos
app.get('/get-data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM charactersheet WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Usuário não encontrado.' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar os dados.' });
    }
});

// Rota para deletar um usuário pelo ID
app.delete('/delete-data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM charactersheet WHERE id = $1 RETURNING *', [id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário deletado com sucesso', deletedUser: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});