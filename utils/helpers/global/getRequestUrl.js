const getRequestFulllUrl = (req) => {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}

const getRequestBaseUrl = (req) => {
    return req.protocol + '://' + req.get('host');
}

export default {
    getRequestFulllUrl,
    getRequestBaseUrl,
};