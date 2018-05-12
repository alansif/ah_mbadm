export function restbase() {
    return "http://111.198.146.40:8084/api/v1/"
}

export function reserr(error) {
    return error.response ? (error.response.data ? error.response.data.status.message : error.response.statusText) : error.message;
}