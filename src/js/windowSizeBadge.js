module.exports = windowSizeBadge;

const resiseObj = {
  curentSetTimeoutId: undefined
}

function windowSizeBadge($badge) {
  $badge.setAttribute('style', '');
  if(resiseObj.curentSetTimeoutId) {
    clearInterval(resiseObj.curentSetTimeoutId);
  }

  $badge.innerText = `${window.innerWidth}px \u00d7 ${window.innerHeight}px`;
  resiseObj.curentSetTimeoutId = setTimeout(() => {
    $badge.setAttribute('style', 'opacity: 0');
  }, 2000);
}