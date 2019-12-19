const response = await fetch('pieces.json');
const myJson = await response.json();
console.log(JSON.stringify(myJson));