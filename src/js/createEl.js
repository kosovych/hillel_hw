module.exports = createEl;

function createEl(tagName, $class, value) {
  let el = document.createElement(tagName);
  if($class) {
    el.classList.add($class);
  }
  
  if(typeof value === 'string' || typeof value === 'number') {
    el.innerHTML = value;
  } else if(typeof value === 'object') {
    el.appendChild(value);
  }
  return el
}