const SpreadSheetHelper = require("./spread-sheet-helper");
const Excel = require('exceljs');
const {dialog} = require('electron')

async function buildFile(metadata, dirname) {
    switch (metadata.fileType) {
        case 'plan': {
            return getPlanFile(metadata, dirname);
        }
        case 'dairy': {
            return  getDairyFile(metadata, dirname);
        }
        case 'topic_determine': {
            return getTopicDetermineFile(metadata, dirname);
        }
        case 'topic_change': {
            return getTopicChangeFile(metadata, dirname);
        }
    }
}

async function getTopicChangeFile(arg, dirname) {
    const magistrantNumbers = arg.data.magistrants.map(mag => mag.privateNumber);
    const groupNumber = arg.data.magistrants[0].groupNumber;
    const allMagistrants = await getMagistrantRows(magistrantNumbers, groupNumber, dirname);
    return buildChangeTopicFile(groupNumber, allMagistrants, dirname)
}

async function getTopicDetermineFile(arg, dirname) {
    const magistrantNumbers = arg.data.magistrants.map(mag => mag.privateNumber);
    const groupNumber = arg.data.magistrants[0].groupNumber;
    const allMagistrants = await getMagistrantRows(magistrantNumbers, groupNumber, dirname);
    return buildDetermineTopicFile(groupNumber, allMagistrants, dirname)
}   

async function buildChangeTopicFile(groupNumber, allMagistrants, dirname){
    const dailyMagistrants = allMagistrants.filter(mag => mag._rawData[4].trim() === 'очн.').slice(0,16);
    const notDailyMagistrants = allMagistrants.filter(mag => mag._rawData[4].trim() === 'заочн.').slice(0, 16);
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(dirname + '/dist/magistrant-master/assets/docs/topic_change.xlsx');

    const firstSheet = workbook.getWorksheet(1);
    const secondSheet = workbook.getWorksheet(2);

    dailyMagistrants.forEach((mag, index)=>{
        mag.positionNumber = index + 1;
    })
    notDailyMagistrants.forEach((mag, index)=>{
        mag.positionNumber = index + 1;
    })

    insertMagistrantsIntoTheSheet(firstSheet, dailyMagistrants, 17);
    insertMagistrantsIntoTheSheet(secondSheet, notDailyMagistrants, 8);

    const filePath = await getSavePath(groupNumber.toString()+'_смена_темы');
    await workbook.xlsx.writeFile(filePath);
}

async function buildDetermineTopicFile(groupNumber, allMagistrants, dirname){
    const dailyMagistrants = allMagistrants.filter(mag => mag._rawData[4].trim() === 'очн.').slice(0,24);
    const notDailyMagistrants = allMagistrants.filter(mag => mag._rawData[4].trim() === 'заочн.').slice(0, 30);
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(dirname + '/dist/magistrant-master/assets/docs/topic.xlsx');
    const firstSheet = workbook.getWorksheet(1);
    const secondSheet = workbook.getWorksheet(2);
    const thirdSheet = workbook.getWorksheet(3);

    dailyMagistrants.forEach((mag, index)=>{
        mag.positionNumber = index + 1;
    })
    notDailyMagistrants.forEach((mag, index)=>{
        mag.positionNumber = index + 1;
    })
    let firstDailyChunk;
    let secondDailyChunk=[];

    if(dailyMagistrants.length > 14){
        secondDailyChunk = dailyMagistrants.slice(14, dailyMagistrants.length);
        firstDailyChunk = dailyMagistrants.slice(0, 14);
    } else{
        firstDailyChunk = dailyMagistrants;
    }
    insertMagistrantsIntoTheSheet(firstSheet, firstDailyChunk, 18);
    insertMagistrantsIntoTheSheet(secondSheet, secondDailyChunk, 4);

    let firstNotDailyChunk;
    let secondNotDailyChunk=[];
    if(notDailyMagistrants.length > 8){
        secondNotDailyChunk = notDailyMagistrants.slice(8, notDailyMagistrants.length);
        firstNotDailyChunk = notDailyMagistrants.slice(0, 8);
    } else{
        firstNotDailyChunk = notDailyMagistrants;
    }
    insertMagistrantsIntoTheSheet(secondSheet, firstNotDailyChunk, 31);
    insertMagistrantsIntoTheSheet(thirdSheet, secondNotDailyChunk, 4);

    const filePath = await getSavePath(groupNumber.toString()+'_утв.темы');
    await workbook.xlsx.writeFile(filePath);
}

function insertMagistrantsIntoTheSheet(sheet, magistrants, startingRowNumber){
    let rowNumber = startingRowNumber;
    for(let i= 0; i< magistrants.length; i++, rowNumber+=2){
        const numberCell = sheet.getCell('A'+ rowNumber);
        const nameCell = sheet.getCell('B'+ rowNumber);
        const topicCell = sheet.getCell('E'+ rowNumber);
        const tutorNameCell = sheet.getCell('I'+ rowNumber);

        numberCell.value = magistrants[i].positionNumber;
        nameCell.value = magistrants[i]._rawData[0];
        topicCell.value = magistrants[i]._rawData[18];
        tutorNameCell.value = magistrants[i]._rawData[12];
    }
}

async function getDairyFile(arg, dirname) {
    const mag = await getMagistrantRow(arg.data.magistrant.privateNumber, arg.data.magistrant.groupNumber, dirname);
    return  buildDairyFile(mag, dirname);
}

async function getPlanFile(arg, dirname) {
    const mag = await getMagistrantRow(arg.data.magistrant.privateNumber, arg.data.magistrant.groupNumber, dirname);
    return  buildPlanFile(mag, dirname);
}

async function buildDairyFile(mag, dirname) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(dirname + '/dist/magistrant-master/assets/docs/dairy.xlsx');

    const mainSheet = workbook.getWorksheet(1);
    const cafedraCell = mainSheet.getCell('E7');
    const specialityCell = mainSheet.getCell('E9');
    const practicePlaceCell = mainSheet.getCell('E15');
    const nameCell = mainSheet.getCell('E17');
    const secondPracticePlaceCell = mainSheet.getCell('A25');
    const topicCell = mainSheet.getCell('C31');
    const universityTutorCell = mainSheet.getCell('C40');
    const practiceTutorCell = mainSheet.getCell('J41');

    cafedraCell.value = mag._rawData[6].trim();
    specialityCell.value = mag._rawData[7].trim();
    practicePlaceCell.value = mag._rawData[11].trim();
    nameCell.value = mag._rawData[0].trim();
    secondPracticePlaceCell.value = mag._rawData[11].trim();
    topicCell.value = mag._rawData[18].trim();
    universityTutorCell.value = mag._rawData[12].trim();

    const filePath = await getSavePath(mag._rawData[0].trim());
    await workbook.xlsx.writeFile(filePath);

}

async function buildPlanFile(mag, dirname) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(dirname + '/dist/magistrant-master/assets/docs/plan.xlsx');

    const worksheet = workbook.getWorksheet(1);
    const nameCell = worksheet.getCell('A19');
    const facultyCell = worksheet.getCell('F24');
    const cafedrCell = worksheet.getCell('F26');
    const specializationCell = worksheet.getCell('F28');
    const topicCell = worksheet.getCell('F32');
    const studenNumberCell = worksheet.getCell('F35');
    const emailCell = worksheet.getCell('F36');
    const tutorNameCell = worksheet.getCell('F39');
    const tutorDegreeCell = worksheet.getCell('F40');
    const tutorWorkDegreeCell = worksheet.getCell('F41');
    const tutorNumber = worksheet.getCell('F44');
    const tutorEmail = worksheet.getCell('F45');
    nameCell.value = mag._rawData[0].trim();
    facultyCell.value = mag._rawData[3].trim();
    cafedrCell.value = mag._rawData[6].trim();
    specializationCell.value = mag._rawData[7].trim();
    topicCell.value = mag._rawData[18].trim();
    studenNumberCell.value = mag._rawData[8].trim();
    emailCell.value = mag._rawData[9].trim();
    tutorNameCell.value = mag._rawData[12].trim();
    tutorDegreeCell.value = mag._rawData[13].trim();
    tutorWorkDegreeCell.value = mag._rawData[14].trim();
    tutorNumber.value = mag._rawData[16].trim();
    tutorEmail.value = mag._rawData[15].trim();

    const programWorksheet = workbook.getWorksheet(3);
    const topicActualityCell = programWorksheet.getCell('A5');
    const topicAimCell = programWorksheet.getCell('A11');
    const topicTasksCell = programWorksheet.getCell('A17');
    const topicObjectCell = programWorksheet.getCell('A22');
    const topicSubjectCell = programWorksheet.getCell('A27');
    topicAimCell.value = mag._rawData[22].trim();
    topicObjectCell.value = mag._rawData[20].trim();
    topicSubjectCell.value = mag._rawData[21].trim();

    const finalWorksheet = workbook.getWorksheet(8);
    const finalNameCell = finalWorksheet.getCell('A19');
    const finalTopicCell = finalWorksheet.getCell('A22');
    finalTopicCell.value = mag._rawData[17].trim();
    finalNameCell.value = mag._rawData[0].trim();

    const filePath = await getSavePath(mag._rawData[0].trim());
    await workbook.xlsx.writeFile(filePath);
}

async function getSavePath(defaultPath) {
    const options = {
        title: "Save file",
        defaultPath,
        buttonLabel: "Save",

        filters: [
            {name: 'xlsx', extensions: ['xlsx']},
        ]
    };

    const {filePath} = await dialog.showSaveDialog(null, options);
    return filePath;
}

async function getMagistrantRow(magistrantNumber, groupNumber, dirname) {
    const groups = SpreadSheetHelper.getGroups(dirname);
    const targetGroup = groups.find(g => +g.name === +groupNumber)
    const sheetId = SpreadSheetHelper.parseSheetId(targetGroup.link);
    const magistrants = await SpreadSheetHelper.getMagistrantsRawData(sheetId);
    const foundMagistrant = magistrants.find(mag => +mag._rawData[1] === +magistrantNumber);
    return new Promise((resolve) => {
        resolve(foundMagistrant);
    });
}

async function getMagistrantRows(magistrantNumbers, groupNumber, dirname) {
    const groups = SpreadSheetHelper.getGroups(dirname);
    const targetGroup = groups.find(g => +g.name === +groupNumber)
    const sheetId = SpreadSheetHelper.parseSheetId(targetGroup.link);
    const magistrants = await SpreadSheetHelper.getMagistrantsRawData(sheetId);
    const foundMagistrants = magistrants.filter(mag => magistrantNumbers.includes(+mag._rawData[1]));
    return new Promise((resolve) => {
        resolve(foundMagistrants);
    });
}

module.exports = {buildFile}
