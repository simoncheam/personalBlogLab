export const TOKEN_KEY = 'token';

export async function APIService<T = any>(uri: string, method: string = 'GET', data?: null) {

    const TOKEN = localStorage.getItem(TOKEN_KEY);

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    }

    const fetchOptions: IFetchOptions = {
        method,
        headers,
        body: JSON.stringify(data)
    };

    if (TOKEN) {
        headers['Authorization'] = `Bearer ${TOKEN}`;
    }

    if (method === 'GET') {
        delete headers['Content-Type'];
        delete fetchOptions.body;
    }

    try {

        const res = await fetch(uri, fetchOptions);

        // custom error handling 
        if (res.status === 400) {
            throw new Error('check fetch options for any errors');
        }

        if (res.status === 401) {
            throw new Error('no token, expired token, or server could not validate token');
        }

        if (res.status === 404) {
            throw new Error('the server endpoint path was not found');
        }

        if (res.status === 500) {
            throw new Error('server blew up, check the terminal logs');
        }

        if (res.ok) {
            return <T>await res.json();
        }



    } catch (error) {
        console.error('[error in APIService]', error.message);
        throw error;

    }


}

interface IFetchOptions {
    method?: string;
    headers?: HeadersInit;
    body?: string;
}