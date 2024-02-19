//imports
const fs = require("fs");
const Category = require("./bin/category.cjs");
const Parser = require("./bin/parser.cjs");
//initiate classes
const parser = new Parser();
//array for categories
const categories = [];
/**
 * fill in categories create new ones by following the patern or extend/shorten already existing ones
 * pattern: new Category("name of category", "highestStat or roll pattern" ["skill 1", "skill 2", "skill 3",  ...])
 * roll patterns: xdyhz, xdylz, xdy
 * xdy - roll x dices with highest value of y
 * hz -  keep highest z values
 * lz - keep lowest z values
 * - number - number that should be substracted from rolled number
 * + number - number that should be added to rolled number
 */

categories.push(
  new Category("FIGHTING", "1000", [
    "long blades",
    "polearms",
    "staffs",
    "maces",
    "flails",
    "axes",
    "unarmed",
    "short blades",
    "bows",
    "slings",
    "crossbows",
    "throwing",
    "light armor",
    "heavy armor",
    "dodging",
    "shield",
    "stealth",
  ])
);
categories.push(
  new Category("LIFE", "1d1h1+20", [
    "woodcutting",
    "fishing",
    "firemaking",
    "cooking",
    "mining",
    "smithing",
    "thieving",
    "fletching",
    "crafting",
    "runecrafting",
    "herblore",
    "farming",
    "brewing",
  ])
);
categories.push(
  new Category("MAGIC", "20", [
    "conjuration",
    "hexes",
    "summoning",
    "necromancy",
    "translocation",
    "alchemy",
    "fire magic",
    "water magic",
    "air magic",
    "earth magic",
    "invocations",
    "evocations",
    "shapeshifting",
    "abjuration",
    "illusion",
    "chronomancy",
    "graviturgy",
    "divination",
    "enchantement",
    "transmutation",
    "artifice",
    "onomancy",
  ])
);

categories.push(
  new Category("DND", "4d6h3", [
    "strength",
    "constitution",
    "dexterity",
    "inteligence",
    "wisdom",
    "charisma",
  ])
);
/*
* Benchmark:
categories.push(new Category("TEST 1", ["test 1", "test 2", "test 3"]));
categories.push(new Category("TEST 2", ["test 4", "test 5", "test 6"]));
categories.push(new Category("TEST 3", ["test 7", "test 8", "test 9"]));
*/
//global calculation
let numberOfSkillsToDistribute = 0;
//results of calculated stats
const resultStats = [];
//global counter
let statsAmAt = 0;

class Creator {
  /**
   * main method to control whole process
   */
  characterCreate(name) {
    const path = name + ".txt";
    //main method to call other methods
    categories.forEach((category) => {
      this.calculate(category.statCalculation, category.skills.length);
    });
    this.writeName(name, path);
    categories.forEach((category) => {
      this.writeStats(category.skills, category.name, path);
    });
  }
  /**
   * calculates stats based on stats maximum value and random chance
   * @param {*} stats value from which stats are calculated
   * @param {*} skills number of skills
   */
  calculate(stats, skills) {
    if (!isNaN(Number(stats))) {
      for (let i = 0; i < skills; i++) {
        let randomFraction = Math.round(Math.random() * stats);
        resultStats.push(randomFraction);
      }
    } else {
      for (let i = 0; i < skills; i++) {
        resultStats.push(parser.parse(stats));
        parser.clear();
      }
    }
  }
  /**
   * writes name of character to file
   * @param {*} name name of character
   * @param {*} path path to file
   */
  writeName(name, path) {
    fs.writeFileSync(path, name + "\n", function (err) {
      if (err) {
        console.log("Error creating character file:", name);
      }
    });
  }
  /**
   * writes stats of the character into file
   * @param {*} array array from which to take skills
   * @param {*} cathegoryName name of skill cathegory
   * @param {*} path path to file
   */
  writeStats(array, cathegoryName, path) {
    fs.appendFileSync(path, "\n\t" + cathegoryName + "\n", function (err) {
      if (err) {
        console.log("Error writing element to the character file:", element);
      }
    });
    array.forEach((element) => {
      fs.appendFileSync(
        path,
        "\t\t" + element + ": " + resultStats[statsAmAt] + "\n",
        function (err) {
          if (err) {
            console.log(
              "Error writing element to the character file:",
              element
            );
          }
        }
      );
      statsAmAt++;
    });
  }
}

//Initiate the class
const creator = new Creator();

/*
 *check if there are all requirements met
 *if yes continue
 *if not, hint to user what is needed of him
 */
if (process.argv.length < 3) {
  console.error("Expected: npm start {NAME}");
  process.exit(1);
} else {
  let now = new Date();
  console.log("start time: " + (new Date() - now) + "ms");
  creator.characterCreate(process.argv[2]);
  console.log("end time: " + (new Date() - now) + "ms");
}
