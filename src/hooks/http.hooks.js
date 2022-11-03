import { useState, useCallback } from "react";

export const useHttp = () => {
    const [ loading, setLoading] = useState(false);
    const [ error, setError] = useState(null);

    // Функция с запросом на сервер. Возвращает данные, или ошибку.
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'applycation/json'}) => {

        setLoading(true);

        // блок try возварщает const data с json ответом от сервера
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data;

        
        // блок catch возвращает e(приходит от браузера) если была ошибка в try
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    // функция чистит сообщение об ошибке
    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}