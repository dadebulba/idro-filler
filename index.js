

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
fs.writeFileSync('script_idro.sql', 'TRUNCATE idrofobia_players CASCADE;\nTRUNCATE players CASCADE;\n')
fs.createReadStream('iscrizioni.csv')
  .pipe(csv())
  .on('data', async (row) => {
      const name = row['Nome']
      const surname = row['Cognome']
      const address = row['Indirizzo']
      const telegram = row['Telegram ID'].split('@')[1]
      const photo = 'https://admin.festantonio.it/assets/' + row['DirectusID']
      const killCode = makeid(10)
      console.log(name, surname, address, telegram, killCode)
      
      fs.appendFileSync('script_idro.sql', `INSERT INTO players (id, name, surname, address) VALUES (${counter}, '${name}', '${surname}', '${address}');\n`);
      fs.appendFileSync('script_idro.sql', `INSERT INTO idrofobia_players (id, telegram_id, kill_code, profile_picture_url) VALUES (${counter}, '${telegram}', '${killCode}', '${photo}');\n`);
      counter++
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });