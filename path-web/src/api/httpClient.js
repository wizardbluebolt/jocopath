import axios from 'axios';

const httpClient = axios.create({
    baseURL: "https://pathofjoco.org",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default { httpClient }