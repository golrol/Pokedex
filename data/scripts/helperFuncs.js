function getFullId(shortId) {
    if (shortId < 10) {
        return '00' + shortId;
    } else if (shortId < 100) {
        return '0' + shortId;
    } else {
        return shortId;
    }
}