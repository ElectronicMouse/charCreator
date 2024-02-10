module.exports = class Parser {
    min = 0;
    max = 0;
    count = 0;
    substract = 0;
    add = 0;
    bool = false
    arrayOfChars = [];
    parse(input) {
    let output = "";
    this.arrayOfChars = input.split("");
    this.min = this.arrayOfChars[0];
    this.max = this.arrayOfChars[2];
    if (this.arrayOfChars.length > 4 && this.arrayOfChars.length < 6) {
        this.check(this.arrayOfChars[3], 3);
    }
    if (this.arrayOfChars.length > 6 && this.arrayOfChars.length < 8){
        this.check(this.arrayOfChars[3], 3);
        this.check(this.arrayOfChars[5], 5);
    }
    if (this.arrayOfChars.length > 8  && this.arrayOfChars.length < 10){
        this.check(this.arrayOfChars[3], 3);
        this.check(this.arrayOfChars[5], 5);
        this.check(this.arrayOfChars[7], 7);
    }
    output = Number(this.calculate(Number(this.min), Number(this.max), Number(this.count), Number(this.substract), Number(this.add)));
    return output;
  }

  calculate(min, max, count, substract, add) {
    let results = [];
    let output = 0;
    for (let i = 0; i < min; i++) {
      results.push(Number(Math.floor(Math.random() * Number(max)) + 1));
    }
    results.sort((a, b) => a - b);
    if (this.bool === true) {
      let stopAt = results.length - count;
      let j = (results.length - 1)
      for (j; j >= stopAt; j--) {
        output += Number(results[j]);
      }
    }
    if (this.bool === false) {
      let stopAt = results.length - count;
      for (let j = 0; j < stopAt; j++) {
        output += Number(results[j]);
      }
    }
    output = output - substract + add;
    return output;
  }
  check(char, pos) {
    pos = Number(pos) + 1;
    switch (char) {
      case '+':
        this.add = Number(this.arrayOfChars[pos]);
        break;
      case '-':
        this.substract = Number(this.arrayOfChars[pos]);
        break;

      case 'h':
        this.bool = true;
        this.count = Number(this.arrayOfChars[pos]);
        break;

      case 'l':
        this.count = Number(this.arrayOfChars[pos]);
        break;
    }
  }
  clear(){
    this.min = 0;
    this.max = 0;
    this.count = 0;
    this.substract = 0;
    this.add = 0;
    this.bool = false;
    this.arrayOfChars.splice(0,this.arrayOfChars.length);
  }

};
