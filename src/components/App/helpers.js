// possible shells positions
// if shells should be more it would be better
// to generate such array when application starts
export const options = [
  [
    {left: 150, top: 75},
    {left: 250, top: 75},
    {left: 350, top: 75},
  ],
  [
    {left: 150, top: 75},
    {left: 350, top: 75},
    {left: 250, top: 75},
  ],
  [
    {left: 250, top: 75},
    {left: 150, top: 75},
    {left: 350, top: 75},
  ],
  [
    {left: 250, top: 75},
    {left: 350, top: 75},
    {left: 150, top: 75},
  ],
  [
    {left: 350, top: 75},
    {left: 150, top: 75},
    {left: 250, top: 75},
  ],
  [
    {left: 350, top: 75},
    {left: 250, top: 75},
    {left: 150, top: 75},
  ],
];

// random int between 0 and max
export function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// choose random positions for shells
export function makeChange() {
  const number = getRandomNumber(options.length)
  return options[number]
}