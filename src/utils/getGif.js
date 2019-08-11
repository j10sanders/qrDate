export default rating => {
  switch(true) {
    case (rating > .9):
      return "https://media.giphy.com/media/l2QE6naM1MTLEiK1W/source.gif"
    case (rating > .5):
      return "https://media.giphy.com/media/3oriO6qJiXajN0TyDu/source.gif"
    default:
      return "https://media.giphy.com/media/p0RDMJGgMXF96/source.gif"
  }
}