let f1 = function() {
  return new Promise((resolve, reject) => {
    resolve([1,2])
  });
}

let f2 = function(values) {
  console.log(values);
  return new Promise((resolve, reject) => {
    resolve([values, [3,4]])
  });
}

f1().then(f2([5,6])).then((val) => {
  console.log(val);
})
