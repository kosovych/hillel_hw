let recipe = {
  eggs: 1,
  glassesOfFlour: 5,
  spoonsOfSugar: 2,
  spoonsOfYeast: 1,
  glassesOfWater: 4
}

let products = {
  eggs: 12,
  glassesOfFlour: 48,
  spoonsOfSugar: 34,
  spoonsOfYeast: 12,
  glassesOfWater: 9
}

function howManyServings(recipte, products) {
      arrOfServings = [],
      servings = 0;

  for (let prodTitle in recipte) {
    let servingsFromProdTitle = Math.floor(products[prodTitle] / recipte[prodTitle]);

    if (isNaN(servingsFromProdTitle) || servingsFromProdTitle === 0 || servingsFromProdTitle === Infinity) {
      console.log(servings);
      return servings;
    } else arrOfServings.push(servingsFromProdTitle)
        
  }

  return Math.min(...arrOfServings)
}

console.log(howManyServings(recipe, products));