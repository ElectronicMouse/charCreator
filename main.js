import { app, BrowserWindow, ipcMain } from "electron";
import Creator from "./src/creator/creator.mjs";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import Tracer from "./src/creator/bin/modules/tracer.mjs";
import Util from "./src/creator/bin/modules/util.mjs";

const util = new Util();
const tracer = new Tracer(util);
const creator = new Creator(util);

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    icon: path.join(util.GUI_ICONS, util.APP_LOGO),
    webPreferences: {
      preload: path.join(util.ROOT_DIR, util.PRELOAD_JS)
    }
  });

  win.loadFile(path.join(util.ROOT_DIR, util.INDEX_HTML));
}

ipcMain.handle(util.IPC_LISTENER_GENERATE, async (event, name, system) => {
  creator.clean();
  try {
    const filePath = creator.characterCreate(name, system);
    return { ok: true, filePath };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle(util.IPC_LISTENER_LIST_SYSTEMS, async () => {
  const dirs = fs.readdirSync(util.SYSTEMS_DIR, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

  const systems = [];

  for (const dir of dirs) {
    const folder = path.join(util.SYSTEMS_DIR, dir);

    const json = fs.readdirSync(folder)
      .find(f => f.endsWith(util.JSON_SUFFIX));

    if (json) {
      systems.push(dir);
    }
  }

  return systems;
});

ipcMain.handle(util.IPC_LISTENER_TRACE, (event, trace, level, line) => {
  tracer.log(trace, level, line);
})

ipcMain.handle(util.IPC_LISTENER_CLEAR_TRACE, (event) => {
  tracer.clearlog();
})

app.whenReady().then(createWindow);

app.on(util.APP_LISTENER_ON_APP_CLOSE, () => {
  if (process.platform !== util.PLATFORM_MAC) {
    app.quit();
  }
});