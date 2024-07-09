// Toma `count` elementos aleatorios del array `array`
export function getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random()); // Baraja el array
    return shuffled.slice(0, count); // Devuelve los primeros `count` elementos
  }
  