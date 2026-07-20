import { app, BrowserWindow, ipcMain } from "electron";
import Creator from "./src/creator/creator.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import Tracer from "./src/bin/modules/tracer.mjs";

const tracer = new Tracer()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __gui = path.join(__dirname, "src/gui");
const __systems = path.join(__dirname, "src/creator/bin/systems");

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    icon: path.join(__gui, "icons/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

    win.loadFile(path.join(__dirname, "index.html"));
}

ipcMain.handle("generate", async (event, name, system) => {
  try {
    const creator = new Creator();
    const filePath = creator.characterCreate(name, system);
    return { ok: true, filePath };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle("listSystems", async () => {
  const files = fs.readdirSync(__systems)
    .filter(f => f.endsWith(".json"))
    .map(f => f.replace(".json", ""));

  return files;
});

ipcMain.on('trace', (event, trace, level, line) => {
  tracer.log(trace, level, line);
})

ipcMain.on('cleartrace', (event) => {
  tracer.clearlog();
})

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});