const { Client } = require('pg');

const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'vokabeltester',
    password: 'sicher', //TODO: Passwort als Hash übergeben
    port: 5432,
});

client.connect()
    .catch(err => console.log(err))
    .then(() => {
        client.query('SELECT * FROM "VokabelEnglisch";')
            .then(result => {
                console.log(result.rows);
            })
    });