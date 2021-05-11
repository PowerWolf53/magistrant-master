const SpreadSheetHelper = require("./spread-sheet-helper");
const Excel = require('exceljs');
const {dialog} = require('electron')

function buildFile(metadata, dirname) {
    switch (metadata.fileType) {
        case 'plan': {
            getPlanFile(metadata, dirname);
            break;
        }
        case 'dairy': {
            getDairyFile(metadata, dirname);
            break;
        }
    }
}

function getDairyFile(arg, dirname) {
    getMagistrantRow(arg.data.magistrant.privateNumber, arg.data.magistrant.groupNumber, dirname).then(mag => {
        buildDairyFile(mag, dirname);
    });
}

function getPlanFile(arg, dirname) {
    getMagistrantRow(arg.data.magistrant.privateNumber, arg.data.magistrant.groupNumber, dirname).then(mag => {
        buildPlanFile(mag, dirname);
    });
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

    cafedraCell.value = mag._rawData[5].trim();
    specialityCell.value = mag._rawData[6].trim();
    practicePlaceCell.value = mag._rawData[10].trim();
    nameCell.value = mag._rawData[0].trim();
    secondPracticePlaceCell.value = mag._rawData[10].trim();
    topicCell.value = mag._rawData[17].trim();
    universityTutorCell.value = mag._rawData[11].trim();

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
    cafedrCell.value = mag._rawData[5].trim();
    specializationCell.value = mag._rawData[6].trim();
    topicCell.value = mag._rawData[17].trim();
    studenNumberCell.value = mag._rawData[7].trim();
    emailCell.value = mag._rawData[8].trim();
    tutorNameCell.value = mag._rawData[11].trim();
    tutorDegreeCell.value = mag._rawData[12].trim();
    tutorWorkDegreeCell.value = mag._rawData[13].trim();
    tutorNumber.value = mag._rawData[15].trim();
    tutorEmail.value = mag._rawData[14].trim();

    const programWorksheet = workbook.getWorksheet(3);
    const topicActualityCell = programWorksheet.getCell('A5');
    const topicAimCell = programWorksheet.getCell('A11');
    const topicTasksCell = programWorksheet.getCell('A17');
    const topicObjectCell = programWorksheet.getCell('A22');
    const topicSubjectCell = programWorksheet.getCell('A27');
    topicAimCell.value = mag._rawData[21].trim();
    topicObjectCell.value = mag._rawData[19].trim();
    topicSubjectCell.value = mag._rawData[20].trim();

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

module.exports = {buildFile}
