const SpreadSheetHelper = require("./utils/spread-sheet-helper");
const ExcelHelper = require("./utils/excel-helper");

const Excel = require('exceljs');

const {dialog, app, BrowserWindow, ipcMain,} = require('electron')

const {promisify} = require('util')

const url = require("url");
const path = require("path");
const fs = require('fs');
const creds = require('./src/assets/creds.json')
const { GoogleSpreadsheet } = require('google-spreadsheet');

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
            enableRemoteModule: true
        },
    })
    mainWindow.maximize();

    // mainWindow.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, `/dist/magistrant-master/index.html`),
    //         protocol: "file:",
    //         slashes: true
    //     })
    // );
    mainWindow.loadURL('http://localhost:4200')
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})


ipcMain.on('get-groups', function(event, arg){
    const groups = SpreadSheetHelper.getGroups(__dirname);
    event.sender.send('groups', groups);
})

ipcMain.on('get-magistrants', function(event, arg){
    SpreadSheetHelper.getMagistrantsByGroupNumber(__dirname, arg).then(magistrants =>{
        event.sender.send('magistrants', {magistrants: magistrants, groupNumber: arg});
    })
})

ipcMain.on('get-file', function(event, arg){
    ExcelHelper.buildFile(arg, __dirname)
});


