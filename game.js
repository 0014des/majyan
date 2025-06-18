import { createWall } from './tiles.js';
import { Player } from './player.js';
import { evaluateYaku } from './yaku.js';
import { canRiichi } from './rules.js';

const wall = createWall();
const players = [
  new Player("You"),
  new Player("CPU1", true),
  new Player("CPU2", true),
  new Player("CPU3", true)
];

const dora = wall.pop();
document.getElementById("dora-tile").textContent = dora;

// 配牌
players.forEach(p => {
  for (let i = 0; i < 13; i++) p.draw(wall.pop());
});

function updateUI() {
  const player = players[0];
  const handDiv = document.getElementById("player-hand");
  handDiv.innerHTML = '';
  player.hand.forEach((tile, index) => {
    const div = document.createElement("div");
    div.className = "tile";
    div.textContent = tile;
    div.onclick = () => {
      const discarded = player.hand.splice(index, 1)[0];
      document.getElementById("message").textContent = `あなたの捨て牌: ${discarded}`;
      updateUI();
      runCPUTurns();
    };
    handDiv.appendChild(div);
  });

  document.getElementById("riichi-button").disabled = !canRiichi(player.hand);
}

document.getElementById("draw-button").onclick = () => {
  const player = players[0];
  const tile = wall.pop();
  player.draw(tile);
  document.getElementById("message").textContent = `ツモ: ${tile}`;
  updateUI();
};

document.getElementById("riichi-button").onclick = () => {
  players[0].riichi = true;
  document.getElementById("message").textContent = "リーチ宣言！";
  document.getElementById("riichi-button").disabled = true;
};

function runCPUTurns() {
  for (let i = 1; i < 4; i++) {
    const cpu = players[i];
    cpu.draw(wall.pop());
    const discarded = cpu.discard();
    document.getElementById(`cpu${i}-hand`).textContent = `CPU${i} 捨て牌: ${discarded}`;
  }
}

updateUI();
