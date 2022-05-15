

const csv = require('csv-parser');
const fs = require('fs');
const { Sequelize } = require('sequelize')
require('dotenv').config()
console.log(process.env.SQL_STRING)

//const sequelize = new Sequelize(process.env.SQL_STRING)
fs.createReadStream('iscrizioni.csv')
  .pipe(csv())
  .on('data', async (row) => {
    if(row['Iscritto per'] == 'Idrofobia') {
      const name = row['Nome']
      const surname = row['Cognome']
      const address = row['Address']
      console.log(name, surname, address)
      //const [results, metadata] = await sequelize.query(`INSERT INTO players (name, surname, address) VALUES ('gino', 'pino', 'via 123')`);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });