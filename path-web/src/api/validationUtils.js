function isURL(pURL) {
    let tURL;
    try {
      tURL = new URL(pURL)
    } catch (error) {
      return false;
    }
    return tURL.protocol === "http:" || tURL.protocol === "https:";
  }

  export { isURL }