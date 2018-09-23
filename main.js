// V1
for(var i = 0; i < 10; i++) {
  setTimeout((i) => {
    console.log(i);
  }, 10, i);
}

// V2

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 10);
}