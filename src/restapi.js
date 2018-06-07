export function restbase() {
    return "/api/v1/"
}

export function reserr(error) {
    return error.response ? (error.response.data ? error.response.data.status.message : error.response.statusText) : error.message;
}