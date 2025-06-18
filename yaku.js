export function evaluateYaku(hand, riichi = false, ippatsu = false) {
  const yaku = [];
  if (riichi) yaku.push("リーチ");
  if (ippatsu) yaku.push("一発");
  if (isTanyao(hand)) yaku.push("断么九");
  if (isToitoi(hand)) yaku.push("対々和");
  if (isPinfu(hand)) yaku.push("平和");
  return yaku;
}

function isTanyao(hand) {
  return hand.every(tile => {
    const num = parseInt(tile[0]);
    return num && num > 1 && num < 9;
  });
}

function isToitoi(hand) {
  const counts = {};
  hand.forEach(t => counts[t] = (counts[t] || 0) + 1);
  return Object.values(counts).filter(c => c >= 3).length >= 4;
}

function isPinfu(hand) {
  return hand.length === 14; // 超簡易チェック
}
