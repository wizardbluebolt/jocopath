import httpClient from "./httpClient";
import { getHeaders } from "./headers";

const client = httpClient.httpClient;

const getApprovedHelp = async () => {
    let response = await client.get("/help");
    return response;
}

const getPendingHelp = async (pToken) => {
     let response = await client.get("/helppending", {headers: getHeaders(pToken)});
     return response;
}

const createHelp = async (pToken, pHelp) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.post("/help", pHelp, config);
    return response;
}

const approveHelp = async (pToken, pHelpID) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.put("/help", {"pHelpID": pHelpID}, config);
    return response;
}

const deleteHelp = async (pToken, pHelpID) => {
    let response = await client.delete("/help?helpID=" + pHelpID, {headers: getHeaders(pToken)});
    return response;
}

export {
    getApprovedHelp,
    getPendingHelp,
    createHelp,
    approveHelp,
    deleteHelp
}