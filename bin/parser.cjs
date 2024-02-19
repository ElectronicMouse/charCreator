module.exports = class Parser {
  min = 0;
  max = 0;
  count = 0;
  substract = 0;
  add = 0;
  bool = false;
  arrayOfChars = [];
  parse(input) {
    let output = "";
    let arrayOfIndexes = this.indexArray(input);
    this.fillArray(arrayOfIndexes, input);
    this.min = this.arrayOfChars[0];
    this.max = this.arrayOfChars[2];
    for (let i = 3; i < this.arrayOfChars.length - 1; i += 2) {
      this.check(this.arrayOfChars[i], i);
    }
    output = this.calculate(
      this.min,
      this.max,
      this.count,
      this.substract,
      this.add
    );
    return output;
  }

  calculate(min, max, count, substract, add) {
    let results = [];
    let output = 0;
    for (let i = 0; i < min; i++) {
      results.push(Math.floor(Math.random() * max) + 1);
    }
    results.sort((a, b) => a - b);
    if (this.bool === true) {
      let stopAt = results.length - count;
      let j = results.length - 1;
      for (j; j >= stopAt; j--) {
        output += results[j];
      }
    }
    if (this.bool === false) {
      let stopAt = results.length - count;
      for (let j = 0; j < stopAt; j++) {
        output += results[j];
      }
    }
    output = output - substract + add;
    return output;
  }
  check(char, pos) {
    pos = pos + 1;
    switch (char) {
      case "+":
        this.add = Number(this.arrayOfChars[pos]);
        break;
      case "-":
        this.substract = Number(this.arrayOfChars[pos]);
        break;

      case "h":
        this.bool = true;
        this.count = Number(this.arrayOfChars[pos]);
        break;

      case "l":
        this.count = Number(this.arrayOfChars[pos]);
        break;
    }
  }
  indexArray(input) {
    let arry = [];
    if (input.indexOf("d") != -1) {
      arry.push(input.indexOf("d"));
    }
    if (input.indexOf("+") != -1) {
      arry.push(input.indexOf("+"));
    }
    if (input.indexOf("-") != -1) {
      arry.push(input.indexOf("-"));
    }
    if (input.indexOf("h") != -1) {
      arry.push(input.indexOf("h"));
    }
    if (input.indexOf("l") != -1) {
      arry.push(input.indexOf("l"));
    }
    arry.sort((a, b) => a - b);
    return arry;
  }
  fillArray(arrayOfIndexes, input) {
    let startIndex = 0;
    for (const index of arrayOfIndexes) {
      this.arrayOfChars.push(input.substring(startIndex, index));
      this.arrayOfChars.push(input.substring(index, index + 1));
      startIndex = index + 1;
    }
    this.arrayOfChars.push(input.substring(startIndex, input.length));
  }
  clear() {
    this.min = 0;
    this.max = 0;
    this.count = 0;
    this.substract = 0;
    this.add = 0;
    this.bool = false;
    this.arrayOfChars.splice(0, this.arrayOfChars.length);
  }
};
