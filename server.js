/* Imports */
const express = require('express');
const app = express();

const pool = require('./database/db');


app.get('/', async (req, res) => {
    // ROTA "/"
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() as current_time');
        const currentTime = result.rows[0].current_time; // Its a Object
        
        console.log(`Server is running on port: ${PORT} ! :D`);
        console.log(`Database connection successful. Current time in the database: ${currentTime}`);

    } catch (error) {
        console.error('Error:', error);

        // Devolve a conexao para o pool
        client.release();

        //Mata a conexao
        /* client.end(); */
    } 
});