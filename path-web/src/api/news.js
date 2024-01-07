import httpClient from "./httpClient";
import { getHeaders } from "./headers";

const client = httpClient.httpClient;

const getApprovedNews = async () => {
    let response = await client.get("/news");
    return response;
}

const getPendingNews = async (pToken) => {
     let response = await client.get("/newspending", {headers: getHeaders(pToken)});
     return response;
}

const createNews = async (pToken, pNews) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.post("/news", pNews, config);
    return response;
}

const approveNews = async (pToken, pNewsID) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.put("/news", {"pNewsID": pNewsID}, config);
    return response;
}

const deleteNews = async (pToken, pNewsID) => {
    let response = await client.delete("/news?newsID=" + pNewsID, {headers: getHeaders(pToken)});
    return response;
}

export {
    getApprovedNews,
    getPendingNews,
    createNews,
    approveNews,
    deleteNews
}