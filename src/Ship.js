function Ship(shipLen) {
  let length = shipLen;
  let hits = 0;
  let sunk = false;

  const getLength = () => length;
  const getHits = () => hits;

  const hit = () => {
    if (hits < length) {
      hits++;
    }
  };

  const isSunk = () => {
    const len = length - hits;
    if (len === 0) {
      sunk = true;
      return sunk;
    }
    return sunk;
  };

  return { getLength, getHits, hit, isSunk };
}

export { Ship };
