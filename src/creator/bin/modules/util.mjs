export default class Util {
    path_gui = "src/gui";

    add(stats, stat, value) {

    }

    check(sysCat, defaultVal) {
        if (sysCat === undefined) {
            return defaultVal;
        }
        return sysCat;
    }
};