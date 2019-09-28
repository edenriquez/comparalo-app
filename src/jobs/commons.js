const isDev = (process.env.ENV === 'development') ? true : false

module.exports.setDebugViewPort = async (pageContext, width, height) => {
  if (!isDev) {
    return
  }
  await pageContext.setViewport({
    width: width,
    height: height
  })
}