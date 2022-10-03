const { contextBridge, ipcMain, ipcRenderer } = require("electron");

let saveData = (fname, city, site, car, song, mobile) => {
  let data = { fname, city, site, car, song, mobile };
  console.log(data);
  ipcRenderer.send("saveData", data);
};

let bridge = {
  saveData,
};

contextBridge.exposeInMainWorld("Bridge", bridge);
