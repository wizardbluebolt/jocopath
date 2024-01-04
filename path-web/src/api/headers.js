function getHeaders (pToken) {
    let tHeaders;
    if (pToken) {
        tHeaders = {
            "Content-Type": "application/json",
            "Authorization": pToken
        }
    } else {
        tHeaders = {
            "Content-Type": "application/json"
        }
    }
    return tHeaders;
}

export { getHeaders }