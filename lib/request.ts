
function request(url: string, method = 'GET', data: any = null) {
    return new Promise((resolve, reject) => {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        if (data) {
            if (method.toUpperCase() === 'GET') {
                const params = new URLSearchParams(data).toString();
                url += '?' + params;
            } else {
                options.body = JSON.stringify(data);
            }
        }
        console.log('url', url)
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export default request