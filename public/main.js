// Modules
const { app, BrowserWindow } = require('electron')
const path = require("path")
const { getDatabase } = require("./db/setup-db")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
async function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1000, height: 800,
        webPreferences: { nodeIntegration: true }
    });

    // Load index.html into the new BrowserWindow
    mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.maximize();

    await getDatabase("shells", "websql");

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Electron `app` is ready
app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {    
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});