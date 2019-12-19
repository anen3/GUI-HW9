const response = fetch('pieces.json');
const myJson = response.json();
console.log(JSON.stringify(myJson));