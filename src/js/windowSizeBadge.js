module.exports = windowSizeBadge;

const resiseObj = {
  curentSetTimeoutId: undefined
}

function windowSizeBadge($badge) {
  if(resiseObj.curentSetTimeoutId) {
    clearInterval(resiseObj.curentSetTimeoutId);
  }
  
  resiseObj.curentSetTimeoutId = setTimeout(() => {
    $badge.innerText = `${window.innerWidth}px \u00d7 ${window.innerHeight}px`;
    $badge.setAttribute('style', 'opacity: 1');
    setTimeout(()=>{$badge.setAttribute('style', 'opacity: 0');}, 2000)
  }, 2000);
}