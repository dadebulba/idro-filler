

const csv = require('csv-parser');
const fs = require('fs');
require('dotenv').config()

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIKLMNOPQRSTUVZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

let counter = 0
fs.createReadStream('iscrizioni.csv')
  .pipe(csv())
  .on('data', async (row) => {
    if(row['Iscritto per'] == 'Idrofobia') {
      const name = row['Nome']
      const surname = row['Cognome']
      const address = row['Indirizzo']
      const telegram = row['Telegram']
      const killCode = makeid(10)
      console.log(name, surname, address, telegram, killCode)
      
      fs.appendFileSync('players.sql', `INSERT INTO players (id, name, surname, address) VALUES (${counter}, '${name}', '${surname}', '${address}');\n`);
      fs.appendFileSync('idrofobia_players.sql', `INSERT INTO idrofobia_players (id, telegram_id, kill_code) VALUES (${counter}, '${telegram}', '${killCode}');\n`);
      counter++
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });