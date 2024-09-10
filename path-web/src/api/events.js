import httpClient from "./httpClient";
import { getHeaders } from "./headers";

const client = httpClient.httpClient;

const getApprovedEvents = async () => {
    let response = await client.get("/event");
    return response;
}

const getArchivedEvents = async (pExpDate) => {
    let response = await client.get("/event?expdate=" + pExpDate);
    return response;
}

const getPendingEvents = async (pToken) => {
     let response = await client.get("/eventpending", {headers: getHeaders(pToken)});
     return response;
}

const createEvent = async (pToken, pEvent) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.post("/event", pEvent, config);
    return response;
}

const approveEvent = async (pToken, pEventID) => {
    let config = {
        headers: getHeaders(pToken),
    }
    let response = await client.put("/event", {"pEventID": pEventID}, config);
    return response;
}

const deleteEvent = async (pToken, pEventID) => {
    let response = await client.delete("/event?eventID=" + pEventID, {headers: getHeaders(pToken)});
    return response;
}

export {
    getApprovedEvents,
    getArchivedEvents,
    getPendingEvents,
    createEvent,
    approveEvent,
    deleteEvent
}