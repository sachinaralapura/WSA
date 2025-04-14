const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchQuestions = async (handleResponse, handleError, setLoading) => {
    setLoading(true);
    const url = `${BASE_URL}/question`;
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        handleResponse(data.questions)
    } catch (err) {
        console.error(err);
        handleError(err.message)
    } finally {
        setLoading(false);
    }
};