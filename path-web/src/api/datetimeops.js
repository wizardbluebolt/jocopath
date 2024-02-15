import date from 'date-and-time';

const defaultExpireDays = 30;

function formatDateTime(pString) {
    if (pString.length === 0) {
        return ""
    }
    let dt = date.parse(pString, 'YYYY-MM-DD HH:mm');
    return date.format(dt, 'M/D/YYYY h:mm A')
}

function formatDateTimeRange(pString1, pString2) {
    let formatted = formatDateTime(pString1);
    if (pString1 == pString2) {
        return formatted;
    }
    if (pString2 == null) {
        return formatted;
    }
    let dt1 = date.parse(pString1, 'YYYY-MM-DD HH:mm');
    formatted += " - ";
    let dt2 = date.parse(pString2, "YYYY-MM-DD HH:mm");
    if (date.isSameDay(dt1, dt2)) {
        formatted += date.format(dt2, "h:mm A");
    } else {
        formatted += formatDateTime(pString2);
    }
    return formatted;
}

function formatDate(pString) {
    if (pString.length === 0) {
        return ""
    }
    let tDate = date.parse(pString, 'YYYY-MM-DD HH:mm');
    return date.format(tDate, 'M/D/YYYY')
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

export { formatDateTime, formatDateTimeRange, formatDate, currentDateTime, defaultExpirationDate }