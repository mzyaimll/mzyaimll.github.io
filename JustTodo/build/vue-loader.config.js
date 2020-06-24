module.exports = (isDev) => {
  return {
    preserveWhiteSpace: true,
    extractCss: !isDev
  }
}
