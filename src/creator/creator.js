// imports
import fs from "fs";
import Category from "./bin/category.mjs";
import Parser from "./bin/parser.mjs";

// class-level parser
const parser = new Parser();

class Creator {
  constructor() {
    this.categories = [];
    this.resultStats = [];
    this.statsAmAt = 0;
  }

  /**
   * Loads system JSON file (systems/*.json)
   */
  loadSystem(systemName) {
    const systemsFile = `./src/creator/bin/systems/${systemName}.json`;

    if (!fs.existsSync(systemsFile)) {
      throw new Error(`System file not found: ${systemsFile}`);
    }

    try {
      const raw = fs.readFileSync(systemsFile, "utf8");
      const systems = JSON.parse(raw);

      systems.forEach(sys => {
        this.categories.push(
          new Category(sys.name, sys.statCalculation, sys.skills)
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
      this.calculate(category.statCalculation, category.skills.length);
    });

    // write output file
    const filePath = `./${name}.txt`;
    this.writeName(name, filePath);

    this.categories.forEach(category => {
      this.writeStats(category.skills, category.name, filePath);
    });

    return filePath;
  }

  /**
   * Calculates stats based on roll pattern or numeric max
   */
  calculate(stats, skills) {
    if (!isNaN(Number(stats))) {
      // numeric max
      for (let i = 0; i < skills; i++) {
        let randomFraction = Math.round(Math.random() * stats);
        this.resultStats.push(randomFraction);
      }
    } else {
      // dice pattern
      for (let i = 0; i < skills; i++) {
        this.resultStats.push(parser.parse(stats));
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
          `\t\t${skill}: ${this.resultStats[this.statsAmAt++]}\n`
        );
      });
    } catch (err) {
      console.error("Error writing stats:", err);
    }
  }
}

export default Creator;