import axios from 'axios';

const request = async ({ url, method = 'GET', body, headers } = {}) => {

    axios.defaults.baseURL = 'https://dummyjson.com';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const fetchData = () => {
        if (method === 'GET') return axios.get(url, { params: body });
        else return axios({ url, method, data: body, headers });
    };

    try {
        const { data, status } = await fetchData();

        return { res: data, status };
    } catch ({ response }) {
        return { err: response };
    }
};

export default request;
