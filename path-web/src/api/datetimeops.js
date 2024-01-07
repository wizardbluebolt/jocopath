import date from 'date-and-time';

const defaultExpireDays = 30;

function formatDateTime(pString) {
    if (pString.length === 0) {
        return ""
    }
    let dt = date.parse(pString, 'YYYY-MM-DD HH:mm');
    return date.format(dt, 'M/D/YYYY h:mm A')
}

function currentDateTime() {
    const now = new Date();
    return date.format(now, "YYYY-MM-DDTHH:mm");
}

function defaultExpirationDate() {
    const now = new Date();
    let expired = date.addDays(now, defaultExpireDays);
    return date.format(expired, "YYYY-MM-DDTHH:mm");
}

export { formatDateTime, currentDateTime, defaultExpirationDate }