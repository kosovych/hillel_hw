function validProductNumb(numb) {
  if (isNaN(numb)) throw new Error('Введите число');
}

function validDiscount(per) {
  if (per > 100) throw new Error('Скидка не может быть больше 100%');
}

function multiply(_firstOperator, _secondOperator) {

  let _firstOperatorNew = _firstOperator * 10;
  let _secondOperatorNew = _secondOperator * 10;

  let result = ((_secondOperatorNew * _firstOperatorNew) / 10).toFixed(2);

  return result
}


class Product {
  constructor(title, price = 0) {
    if (parseFloat(price) < 0 || isNaN(parseFloat(price))) {
      throw new Error('Цена продукта должа быть числом больше нуля');
    }

    this.title = title;
    this.price = parseFloat(price).toFixed(2);
  }

  get priceList() {
    let priceListVal = `${this.title}.\n${this.price}грн`;
    console.log(priceListVal);
  }

  makeDiscount(discountVal) {
    let discountInPercent = parseFloat(discountVal);
    validProductNumb(discountInPercent);
    validDiscount(discountInPercent);

    let discount = (discountInPercent > 0) ?
      parseFloat(discountVal) / 100 * (this.price) :
      -parseFloat(discountVal) / 100 * (this.price);

    let newPrice = +this.price - discount;
    newPrice = newPrice.toFixed(2);
    this.price = newPrice;

    this.priceList;
  }
  makeMarkup(markupVal) {
    let markupInPercent = parseFloat(markupVal);
    validProductNumb(markupInPercent);

    let discount = (markupInPercent > 0) ?
      parseFloat(markupVal) / 100 * (this.price) :
      -parseFloat(markupVal) / 100 * (this.price);

    let newPrice = +this.price + discount;
    newPrice = newPrice.toFixed(2);

    this.price = newPrice;

    this.priceList;
  }

}


const apple = new Product('Яблоки украинские', '1.1111111');

console.log(apple);
apple.makeMarkup(10);
console.log(apple);

const orange = new Product('Апельсины', 10);

console.log(orange);
orange.makeDiscount(10);
console.log(orange);
