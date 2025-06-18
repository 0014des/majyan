export function createWall() {
  const suits = ["萬", "筒", "索"];
  let wall = [];
  for (let suit of suits) {
    for (let i = 1; i <= 9; i++) {
      for (let j = 0; j < 4; j++) {
        wall.push(i + suit);
      }
    }
  }
  const honors = ["東", "南", "西", "北", "白", "發", "中"];
  honors.forEach(h => wall.push(...Array(4).fill(h)));
  return shuffle(wall);
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
