import { throws } from "assert";
import axios, { AxiosError, AxiosResponse } from "axios";

import { toast } from "react-toastify";


axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError<any>) => {

    const data = error.response?.data;

    switch (error.response?.status) {

        case 400:
            if (data.errors) {
                const validationErrors: string[] = [];
                for (const key in data.errors)
                    validationErrors.push(data.errors[key]);

                throw validationErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:

            toast.error(data.title);
            break;

        default:
            break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
};

const TestErrors = {
    get400: () => requests.get('buggy/bad-request'),
    get401: () => requests.get('buggy/unauthorized'),
    get404: () => requests.get('buggy/not-found'),
    get500: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity: number = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity: number = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
};

export default agent;