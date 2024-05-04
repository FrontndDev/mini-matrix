import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'
import { useShowMessage } from "@/composables/useShowMessage";

const __IS_DEV__ = import.meta.env.VITE_IS_DEV === 'true'

const devUrl = import.meta.env.VITE_DEV_URL ?? 'https://dev.halk.ai' // 'https://stage2.halk.ai' 'https://dev.halk.ai'
const BASE_URL = __IS_DEV__ ? devUrl : window.location.origin;

const checkUserIsModer = (error: AxiosError) => {
    const errorResponse = error.response as AxiosResponse

    //@ts-ignore
    if (window.UserData.moder) {
        useShowMessage('red', errorResponse.data.error_message, 'Ошибка:')
    } else if (error?.response?.status !== 500) {
        useShowMessage('red', errorResponse.data.error_message, 'Ошибка:')
    }

    console.error(error)
}

function setGlobalConfig(token: string | null) {

    function getCookie(name: string) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    const defaultSettings: AxiosRequestConfig["headers"] = {
        "Content-Type": "application/json",
        "x-auth": getCookie('dasdasdaddjdj'),
    };

    if (__IS_DEV__) {
        defaultSettings["x-auth"] = import.meta.env.VITE_X_AUTH
        defaultSettings["X-SPACE-ID"] = import.meta.env.VITE_X_SPACE_ID
    }

    return token ? { ...defaultSettings, "Authorization": 'Bearer ' + token } : defaultSettings
}

export async function putAsync(url: string, data: unknown, checkError = true): Promise<any> {
    let iteration = 0; // Итерация
    let retryInterval = 0; // Интервал между повторными запросами в миллисекундах

    async function fetchAsync(): Promise<any> {
        try {
            let response = await axios.put(BASE_URL + url, data, { headers: setGlobalConfig(localStorage.getItem('token')) })

            if (response?.data?.error_code !== undefined) {
                const error = response.data
                useShowMessage('red', error.error_message, 'Ошибка:')
            }

            if (response.status === 200 || response.status === 202) {
                iteration = 0
                retryInterval = 0
                return response?.data
            }

            if (response.status === 204 || response.status === 201) {
                return true
            }
        } catch (error: any) {
            if (checkError && error.response) {
                return error.response
            }
            checkUserIsModer(error)

            const setSeconds = () => {
                // Присваиваем в переменную кол-во секунд в зависимости от итерации
                const iterations = [1000, 5000, 10000, 30000, 60000]
                retryInterval = iterations[iteration]
            }

            setSeconds()

            const errorResponse = error.response as AxiosResponse
            const status = errorResponse.status

            if (status === 500 || status === 502) {
                // Увеличиваем итерацию
                if (iteration < 4) ++iteration

                console.log(`Повторяем запрос через ${retryInterval / 1000} секунд...`);
                // Ожидаем перед повторным запросом
                await new Promise(resolve => setTimeout(resolve, retryInterval));
                // Рекурсивно вызываем функцию fetchAsync
                return fetchAsync();
            }
        }
    }

    // Запускаем fetchAsync
    return fetchAsync();
}

export async function postAsync(url: string, data = {}, checkError = true): Promise<any> {
    let iteration = 0; // Итерация
    let retryInterval = 0; // Интервал между повторными запросами в миллисекундах

    async function fetchAsync(): Promise<any> {

        try {
            let response = await axios.post(BASE_URL + url, data, { headers: setGlobalConfig(localStorage.getItem('token')) })

            if (response?.data?.error_code !== undefined) {
                const error = response.data
                useShowMessage('red', error.error_message, 'Ошибка:')
            }

            if (response.status === 200) {
                iteration = 0
                retryInterval = 0
                return response?.data
            }

            if (response.status === 204 || response.status === 201) {
                return true
            }
        } catch (e) {
            const error = e as AxiosError
            if (checkError && error.response) {
                return error.response
            }
            checkUserIsModer(error)

            const setSeconds = () => {
                // Присваиваем в переменную кол-во секунд в зависимости от итерации
                const iterations = [1000, 5000, 10000, 30000, 60000]
                retryInterval = iterations[iteration]
            }

            setSeconds()

            const errorResponse = error.response as AxiosResponse
            const status = errorResponse.status

            if (status === 500 || status === 502) {
                // Увеличиваем итерацию
                if (iteration < 4) ++iteration

                console.log(`Повторяем запрос через ${retryInterval / 1000} секунд...`);
                // Ожидаем перед повторным запросом
                await new Promise(resolve => setTimeout(resolve, retryInterval));
                // Рекурсивно вызываем функцию fetchAsync
                return fetchAsync();
            }
        }
    }

    // Запускаем fetchAsync
    return fetchAsync();
}

export async function getAsync(url: string, options?: any): Promise<any> {
    const config: any = { headers: setGlobalConfig(localStorage.getItem('token')) };
    let iteration = 0; // Итерация
    let retryInterval = 0; // Интервал между повторными запросами в миллисекундах

    async function fetchAsync(): Promise<any> {
        try {
            if (options?.cancelTokenSource?.token) config.cancelToken = options.cancelTokenSource.token;

            let response = await axios.get(BASE_URL + url, config);

            if (response?.data?.error_code !== undefined) {
                const error = response.data;
                useShowMessage('red', error.error_message, 'Ошибка:');
            }

            if (response.status === 200) {
                iteration = 0
                retryInterval = 0
                return response?.data;
            }

        } catch (e) {
            const setSeconds = () => {
                // Присваиваем в переменную кол-во секунд в зависимости от итерации
                const iterations = [1000, 5000, 10000, 30000, 60000]
                retryInterval = iterations[iteration]
            }

            setSeconds()

            const errorCodes = ['ERR_CANCELED'];
            const error = e as AxiosError;

            if (!errorCodes.includes(error.code ?? '')) {
                checkUserIsModer(error);
            } else {
                return;
            }

            const errorResponse = error.response as AxiosResponse
            const status = errorResponse.status

            console.error('Ошибка при выполнении запроса:', error);

            if (status === 500 || status === 502) {
                // Увеличиваем итерацию
                if (iteration < 4) ++iteration

                console.log(`Повторяем запрос через ${retryInterval / 1000} секунд...`);
                // Ожидаем перед повторным запросом
                await new Promise(resolve => setTimeout(resolve, retryInterval));
                // Рекурсивно вызываем функцию fetchAsync
                return fetchAsync();
            }
        }
    }

    // Запускаем fetchAsync
    return fetchAsync();
}
