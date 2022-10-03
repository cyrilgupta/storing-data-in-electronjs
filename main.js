const { app, BrowserWindow, ipcMain } = require("electron");
const MainScreen = require("./screens/main/mainScreen");
const Globals = require("./globals");
const fs = require("fs");

let curWindow;

function createWindow() {
  curWindow = new MainScreen();
}

ipcMain.on("saveData", (sender, data) => {
  console.log(data);
  let sData = JSON.stringify(data);
  fs.writeFileSync("data/data.json", sData);
  console.log("Data Saved");
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  //Read the data
  let res = fs.existsSync("data/data.json");
  console.log(res);
  if (res) {
    let dt = fs.readFileSync("data/data.json");
    let data = JSON.parse(dt);
    console.log(data);
  }
});

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});
