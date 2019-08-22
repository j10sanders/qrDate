// I want there to be 10 gifs per category, so I can pick one without it being random (by using current minute). Helpful in case of re-renders.

const yesGifs = [
  "https://media.giphy.com/media/2ux0Sa0jwDSreIorwd/giphy.gif",
  "https://media.giphy.com/media/iTjhKpMF50fNS/giphy.gif",
  "https://media.giphy.com/media/cXKZDaAdEgcqA/giphy.gif",
  "https://media.giphy.com/media/fxHpSohzG4uK4/giphy.gif",
  "https://media.giphy.com/media/y8Mz1yj13s3kI/giphy.gif",
  "https://media.giphy.com/media/QMkPpxPDYY0fu/giphy.gif",
  "https://media.giphy.com/media/3kK1hN0rsPVVGWuJR7/giphy.gif",
  "https://media.giphy.com/media/l1ughbsd9qXz2s9SE/giphy.gif",
  "https://media.giphy.com/media/YHYmMLkOmqoo/giphy.gif",
  "https://media.giphy.com/media/l2QE6naM1MTLEiK1W/giphy.gif",
  "https://media.giphy.com/media/eeOA4YIzJlEU8/giphy.gif",
  "https://media.giphy.com/media/i3KXFJFkqgw8jVaN8M/giphy.gif",
];

const maybeGifs = [
  "https://media.giphy.com/media/pyj1t9PYiVqes/giphy.gif",
  "https://media.giphy.com/media/2iDgis3O3PyKY/giphy.gif",
  "https://media.giphy.com/media/muUi39vx8gj2o/giphy.gif",
  "https://media.giphy.com/media/S7RAioXMRs8b6/giphy.gif",
  "https://media.giphy.com/media/1BcfiGuO4Nxe1KlTe9/giphy.gif",
  "https://media.giphy.com/media/FCzMUL20U7LkA/giphy.gif",
  "https://media.giphy.com/media/69EeWAwQgFyTMDZAIZ/giphy.gif",
  "https://media.giphy.com/media/WSO1ZT9sug15C/giphy.gif",
  "https://media.giphy.com/media/DfdbTJZx6Yjra/giphy.gif",
  "https://media.giphy.com/media/3oEduV4SOS9mmmIOkw/giphy.gif",
  "https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif",
  "https://media.giphy.com/media/8vRo0PXvKfoFXEn58N/giphy.gif",
];

const negativeGifs = [
  "https://media.giphy.com/media/3o7ZetIsjtbkgNE1I4/giphy.gif",
  "https://media.giphy.com/media/12h4pgk1SRtLuo/giphy.gif",
  "https://media.giphy.com/media/g0vZyAfPuhVd2SPj6q/giphy.gif",
  "https://media.giphy.com/media/3o7TKHluf42s3st6qA/giphy.gif",
  "https://media.giphy.com/media/ToMjGpx9F5ktZw8qPUQ/giphy.gif",
  "https://media.giphy.com/media/KJ2jDqNON6mZ2/giphy.gif",
  "https://media.giphy.com/media/1jWAOgDVDXfp96hz8f/giphy.gif",
  "https://media.giphy.com/media/23BST5FQOc8k8/giphy.gif",
  "https://media.giphy.com/media/cKKXNlTYino7hWNXwl/giphy.gif",
  "https://media.giphy.com/media/G7iGNzr3VBING/giphy.gif",
  "https://media.giphy.com/media/S7aF5YPXDMMwM/giphy.gif"
];

export default rating => {
  const date = new Date();
  const minutes = date.getMinutes();
  const lastMinute = Number(
    minutes
      .toString()
      .split("")
      .pop()
  );

  switch (true) {
    case rating > 0.7:
      return yesGifs[lastMinute];
    case rating > 0.4:
      return maybeGifs[lastMinute];
    default:
      return negativeGifs[lastMinute];
  }
};
