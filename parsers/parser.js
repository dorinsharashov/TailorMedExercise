const date = require('date-and-time');

const parseRow = (schema,hospitalConfig,row) => {
    let result = {};
    for( let key of Object.keys(schema)){
        switch (schema[key].type){
            case "String":
                if(hospitalConfig[key] && hospitalConfig[key].regex){
                    let match = row[hospitalConfig[key].name].match(new RegExp(hospitalConfig[key].regex));
                    result[key] = match ? match[0] : null

                }else {
                    result[key] = row[hospitalConfig[key].name];
                }
                break;
            case "Date":
                row[hospitalConfig[key].name]?
                    result[key] = date.format(new Date(row[hospitalConfig[key].name]), schema[key].pattern)
                    :
                    result[key] = null;
                break;
            case "Enum":
                let value = row[hospitalConfig[key].name];
                if(schema[key].validValues.includes(value)){
                    result[key] = value;
                }else{
                    hospitalConfig[key].mapping[value] ?
                        result[key] = hospitalConfig[key].mapping[value]
                        :
                        result[key] = null
                }
                break;
            default:
                break;
        }
    }

    return result;
};

module.exports = parseRow;