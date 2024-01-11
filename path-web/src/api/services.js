import httpClient from "./httpClient";
import { getHeaders } from "./headers";

const client = httpClient.httpClient;

const getApprovedServices = async () => {
    let response = await client.get("/service");
    return response;
}

const getPendingServices = async (pToken) => {
     let response = await client.get("/servicepending", {headers: getHeaders(pToken)});
     return response;
}

const createService = async (pToken, pService) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.post("/service", pService, config);
    return response;
}

const approveService = async (pToken, pServiceID) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.put("/service", {"pServiceID": pServiceID}, config);
    return response;
}

const deleteService = async (pToken, pServiceID) => {
    let response = await client.delete("/service?serviceID=" + pServiceID, {headers: getHeaders(pToken)});
    return response;
}

export {
    getApprovedServices,
    getPendingServices,
    createService,
    approveService,
    deleteService
}