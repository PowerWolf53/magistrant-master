const googleSpreadSheet = require("google-spreadsheet");
const fs = require('fs');

const groupsFilePath = '/dist/magistrant-master/assets/groups.json';
const creds = require('./../src/assets/creds.json')


function getGroups(dirname){
    const rawData = fs.readFileSync(dirname + groupsFilePath);
    return JSON.parse(rawData);
}

async function getMagistrantsByGroupNumber(dirname, groupNumber){
    const groups = getGroups(dirname)
    const targetGroup = groups.find((group)=> +group.name  === +groupNumber);
    const sheetId = parseSheetId(targetGroup.link);
    return await getMagistantsFromSheet(sheetId, groupNumber);
}


function parseSheetId(link){
    return link.match(/[-\w]{25,}/)[0];

}

async function getMagistrantsRawData(sheetId){
    const rawDoc = new googleSpreadSheet.GoogleSpreadsheet(sheetId);
    const doc = await authenticate(rawDoc);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    rows.splice(0, 1);
    return new Promise((resolve, reject)=>{
        resolve(rows);
    });
}

async function getMagistantsFromSheet(sheetId, groupId){
    const rows = await getMagistrantsRawData(sheetId);
    const magistrants = rows.map(row => {
        return {
            groupNumber: groupId,
            name: row._rawData[0],
            supervisor: row._rawData[12],
            practicePlace: row._rawData[11],
            workingTopic: row._rawData[18],
            privateNumber: +row._rawData[1]
        }
    })
    return new Promise((resolve) => {
        resolve({groupNumber: groupId, magistrants: magistrants})
    });
}

async function authenticate(doc){
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    return doc;
}

module.exports = {getGroups, getMagistrantsByGroupNumber, getMagistrantsRawData, parseSheetId}
