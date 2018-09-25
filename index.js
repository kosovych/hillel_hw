let arrSelector = ['.blue', '.red', '.yellow'];
let count = 0

document.querySelector('.bar').addEventListener('click', function progressHandler(ev) {
  startProgress(ev)
  .then(rmBySelector)
  .then(rmBySelector)
  .then(rmBySelector)
  .catch(val => this.removeEventListener('click', progressHandler));
});

function startProgress(ev) {
  return new Promise((resolve, reject) => {
    ev.target.classList.add('active');
    ev.target.children[0].addEventListener('transitionend', ev => { return resolve(arrSelector[count])})
  })
}

function rmBySelector(selector) {
  return new Promise((res, rej) => {
    let collectonBySelector = document.querySelectorAll(selector);
    collectonBySelector[collectonBySelector.length - 1].addEventListener('transitionend', function nextPromice(ev) {
      ev.target.removeEventListener('transitionend', nextPromice);
      count++;
      if(!arrSelector[count]) {
        rej();
      }
      res(arrSelector[count]);
    });
  
    Array.from(collectonBySelector).forEach(el => {
      el.style.width = '0px';
      el.style.height = '0px';
    });
  })
}