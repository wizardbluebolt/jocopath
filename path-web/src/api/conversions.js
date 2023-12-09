// Flatten the objects returned from server API
// Each object is of the form {"EventID": {"S": "001"}, "Headline": {"S": "An event headline"}, ...}
// The "S" key provides the data type from the database.  As all data types are strings in this application
// the data type is not useful
// Convert each object to {"EventID": "001", "Headline": "An event headline", ...}
function convertObjects(pList) {
    const rList = [];
    pList.forEach(function (pEvent) {
        const tEvent = {};
        for (const key in pEvent) {
            tEvent[key] = pEvent[key].S;
        }
        rList.push(tEvent);
    });
    return (rList);
}

export { convertObjects }
