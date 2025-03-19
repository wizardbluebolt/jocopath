import httpClient from "./httpClient";
import { getHeaders } from "./headers";

const client = httpClient.httpClient; 

const getApprovedDonations = async () => {
    let response = await client.get("/donation");
    return response;
}

const getArchivedDonations = async (pExpDate) => {
    let response = await client.get("/donation?expdate=" + pExpDate);
    return response;
}

const getPendingDonations = async (pToken) => {
    let response = await client.get("/donationpending", {headers: getHeaders(pToken)});
    return response;
}

const createDonation = async (pToken, pDonation) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.post("/donation", pDonation, config);
    return response;
}

const approveDonation = async (pToken, pDonationID) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.put("/donation", {"pDonationID": pDonationID}, config);
    return response;
}

const deleteDonation = async (pToken, pDonationID) => {
    let response = await client.delete("/donation?donationID=" + pDonationID, {headers: getHeaders(pToken)});
    return response;
}

export {
    getApprovedDonations,
    getArchivedDonations,
    getPendingDonations,
    createDonation,
    approveDonation,
    deleteDonation
}