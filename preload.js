const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld("api", {
  generate: (name, system) => ipcRenderer.invoke("generate", name, system), //window.api.generate("character name", "system name")
  listSystems: () => ipcRenderer.invoke("listSystems"), //window.api.listSystems()
  clearTrace: () => ipcRenderer.send("cleartrace"), //window.api.clearTrace()
  trace: (trace, level, line) => ipcRenderer.send('trace', trace, level, line)  //window.api.trace("error message", "DEBUG", "filename.js:line")
});
