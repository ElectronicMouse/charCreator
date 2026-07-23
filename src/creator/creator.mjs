// imports
import fs from "fs";
import Category from "./bin/modules/category.mjs";
import Parser from "./bin/modules/parser.mjs";
import path from "path";

// class-level parser
const parser = new Parser();

export default class Creator {

  categories = [];
  resultStats = new Map();
  resultModifiers = new Map();
  statsAmAt = 0;

  constructor(util) {
    this.util = util;
  }

  /**
   * Loads system JSON file (systems/*.json)
   */
  loadSystem(systemName) {
    const systemsFile = path.join(
      this.util.SYSTEMS_DIR,
      systemName,
      `${systemName}${this.util.JSON_SUFFIX}`
    );
    if (!fs.existsSync(systemsFile)) {
      throw new Error(`System file not found: ${systemsFile}`);
    }

    try {
      const raw = fs.readFileSync(systemsFile, this.util.ISO_UTF8);
      const systems = JSON.parse(raw);
      systems.forEach(sys => {

        let sysName = this.util.check(sys.name, "Unnamed Category");
        let sysStatCalculation = this.util.check(sys.statCalculation, "1");
        let sysSkills = this.util.check(sys.skills, []);
        let sysSubfunctions = this.util.check(sys.subfunctions, []);
        let sysModPattern = this.util.check(sys.modPattern, null);
        this.categories.push(
          new Category(sysName, sysStatCalculation, sysSkills, sysSubfunctions, sysModPattern)
        );
      });
    } catch (err) {
      throw new Error(`Error parsing system '${systemName}': ${err}`);
    }
  }

  /**
   * Main entry point for character creation
   */
  characterCreate(name, systemName) {
    this.loadSystem(systemName);
    // calculate stats
    this.categories.forEach(category => {
      this.calculate(category);
    });

    // write output file
    const filePath = path.join(this.util.ROOT_DIR, `${name}${this.util.TXT_SUFFIX}`);
    this.writeName(name, filePath);

    this.categories.forEach(category => {
      this.writeStats(category.skills, category.name, filePath);
    });

    return filePath;
  }

  /**
   * Calculates stats based on roll pattern or numeric max
   */
  calculate(category) {
    let pattern = category.statCalculation;
    let modifierPattern = category.modPattern;
    console.log(`Calculating pattern: ${category.statCalculation}`);
    console.log(`Modifier pattern: ${modifierPattern}`);
    for (let i = 0; i < category.skills.length; i++) {
      if (!isNaN(Number(pattern))) {
        // numeric pattern
        let randomFraction = Math.round(Math.random() * pattern);
        this.resultStats.set(category.skills[i], randomFraction);
        this.resultModifiers.set(category.skills[i], parser.parseModifier(modifierPattern, this.resultStats.get(category.skills[i])));
      } else {
        //dice pattern
        this.resultStats.set(category.skills[i], parser.parse(pattern));
        this.resultModifiers.set(category.skills[i], parser.parseModifier(modifierPattern, this.resultStats.get(category.skills[i])));
        parser.clear();
      }
    }
  }

  /**
   * Writes character name to file
   */
  writeName(name, path) {
    try {
      fs.writeFileSync(path, name + "\n");
    } catch (err) {
      console.error("Error creating character file:", err);
    }
  }

  /**
   * Writes stats of the character into file
   */
  writeStats(array, categoryName, path) {
    try {
      fs.appendFileSync(path, `\n\t${categoryName}\n`);

      array.forEach(skill => {
        fs.appendFileSync(
          path,
          `\t\t${skill}: ${this.resultStats.get(skill)}\n\t\t${skill} modifier: ${this.resultModifiers.get(skill)}\n`
        );
      });
    } catch (err) {
      console.error("Error writing stats:", err);
    }
  }

  clean() {
    this.categories = [];
    this.resultStats = new Map();
    this.resultModifiers = new Map();
    this.statsAmAt = 0;
  }
}