const maths = {
  result: 0,
  sum() {
    let arg = Array.from(arguments);
    arg.forEach((currentValue) => { 
      this.result = this.result + currentValue;
    }, this.result);
    return this;
  },
  minus() {
    let arg = Array.from(arguments);
    arg.forEach((currentValue) => {
      this.result = this.result - currentValue;
    }, this.result);
    return this;
  },
  multiplay() {
    let arg = Array.from(arguments);
    arg.forEach((currentValue) => {
      this.result = this.result * currentValue;
    }, this.result);
    return this;
  },
  showResult() {
    console.log(this.result);
    return this.result;
  }
};

maths.sum(1,1,1,1,1)
  .minus(1,1)
  .multiplay(2,2)
  .showResult();
