const csv = require('csv-parser');
const fs = require('fs');
const filePaths = require("./config/filesProperties.json");
const parser = require("./parsers/parser");
const database = [];

const main = () => {
    for(let file of filePaths){
        fs.createReadStream(`${file.filePath}`)
            .pipe(csv())
            .on('data', (row) => {
                const mapping = require(`./config/mapping/${file.mapping}.json`);
                const schema = require(`./config/schema/${file.schema}.json`);
                saveEntityToDatabase(parser(schema, mapping[file.schema], row));
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            });
    }
};

const saveEntityToDatabase = (row) => {
    database.push(row);
    console.log(row);
};

main();

