function multiply(_firstOperator, _secondOperator) {

  let _firstOperatorNew = _firstOperator * 10;
  let _secondOperatorNew = _secondOperator * 10;

  let result = ((_secondOperatorNew * _firstOperatorNew) / 10).toFixed(2);

  return result
}