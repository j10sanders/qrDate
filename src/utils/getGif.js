const yesGifs = [
  "https://media.giphy.com/media/iTjhKpMF50fNS/giphy.gif",
  "https://media.giphy.com/media/cXKZDaAdEgcqA/giphy.gif",
  "https://media.giphy.com/media/fxHpSohzG4uK4/giphy.gif",
  "https://media.giphy.com/media/u23zXEvNsIbfO/giphy.gif",
  "https://media.giphy.com/media/y8Mz1yj13s3kI/giphy.gif",
  "https://media.giphy.com/media/QMkPpxPDYY0fu/giphy.gif",
  "https://media.giphy.com/media/3kK1hN0rsPVVGWuJR7/giphy.gif",
  "https://media.giphy.com/media/l1ughbsd9qXz2s9SE/giphy.gif"
];

const maybeGifs = [
  "https://media.giphy.com/media/1BcfiGuO4Nxe1KlTe9/giphy.gif",
  "https://media.giphy.com/media/FCzMUL20U7LkA/giphy.gif",
  "https://media.giphy.com/media/69EeWAwQgFyTMDZAIZ/giphy.gif",
  "https://media.giphy.com/media/WSO1ZT9sug15C/giphy.gif",
  "https://media.giphy.com/media/DfdbTJZx6Yjra/giphy.gif",
  "https://media.giphy.com/media/3oEduV4SOS9mmmIOkw/giphy.gif"
];

const negativeGifs = [
  "https://media.giphy.com/media/12h4pgk1SRtLuo/giphy.gif",
  "https://media.giphy.com/media/zZyPxf3Cz58uk/giphy.gif",
  "https://media.giphy.com/media/g0vZyAfPuhVd2SPj6q/giphy.gif",
  "https://media.giphy.com/media/3o7TKHluf42s3st6qA/giphy.gif",
  "https://media.giphy.com/media/ToMjGpx9F5ktZw8qPUQ/giphy.gif",
  "https://media.giphy.com/media/KJ2jDqNON6mZ2/giphy.gif",
  "https://media.giphy.com/media/1jWAOgDVDXfp96hz8f/giphy.gif"
];

export default rating => {
  switch (true) {
    case rating > 0.6:
      return yesGifs[Math.floor(Math.random() * yesGifs.length)];
    case rating > 0.3:
      return maybeGifs[Math.floor(Math.random() * maybeGifs.length)];
    default:
      return negativeGifs[Math.floor(Math.random() * negativeGifs.length)];
  }
};
