import { fileURLToPath } from "url";
import path from "path";

export default class Util {

    //private helper variables
    #filename = fileURLToPath(import.meta.url);
    #dirname = path.dirname(this.#filename);

    //public common variables
    ROOT_DIR = path.resolve(this.#dirname, "../../../..");
    GUI_ICONS = path.join(this.ROOT_DIR, "src/gui/icons");
    SYSTEMS_DIR = path.join(this.ROOT_DIR, "src/creator/bin/systems");
    LOGS_DIR = path.join(this.ROOT_DIR, "src/creator/bin/logs");


    //public file names
    APP_LOGO = "icon.png";
    INDEX_HTML = "index.html";
    PRELOAD_JS = "preload.js";
    LOG_FILE = "logfile.txt";

    //public file suffixes
    JSON_SUFFIX = ".json";
    TXT_SUFFIX = ".txt";

    //public ipc listeners names
    IPC_LISTENER_GENERATE = "generate";
    IPC_LISTENER_LIST_SYSTEMS = "listSystems";
    IPC_LISTENER_TRACE = "trace";
    IPC_LISTENER_CLEAR_TRACE = "cleartrace";

    //public app listeners names
    APP_LISTENER_ON_APP_CLOSE = "window-all-closed";

    //public platform names
    PLATFORM_WINDOWS = "win32";
    PLATFORM_MAC = "darwin";
    PLATFORM_LINUX = "linux";

    //public ISO formats
    ISO_2_DIGIT = "2-digit";
    ISO_NUMERIC = "numeric";
    ISO_UTF8 = "utf-8";


    //public helper functions
    add(stats, stat, value) {

    }

    check(sysCat, defaultVal) {
        if (sysCat === null || sysCat === undefined) {
            return defaultVal;
        }
        return sysCat;
    }

    getSystemLocale() {
        return Intl.DateTimeFormat().resolvedOptions().locale;
    }
};