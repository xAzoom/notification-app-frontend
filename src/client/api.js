const request = (method, url, body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    }

    if (!['GET', 'HEAD'].includes(method)) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options);
}

export default request;