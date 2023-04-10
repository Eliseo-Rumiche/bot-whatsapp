const generateUUID = () => {
    let d = new Date()
    let uuid = d.toLocaleTimeString().replaceAll(':', '-') +'-'+ d.getMilliseconds()
    return uuid;
}

module.exports = generateUUID
