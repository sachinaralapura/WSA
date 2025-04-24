const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchQuestionsApi = async (handleResponse, handleError, setLoading) => {
    setLoading(true);
    const url = `${BASE_URL}/question`;
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "unknown error");
        handleResponse(data.questions)
    } catch (err) {
        console.error(err);
        handleError(err.message)
    } finally {
        setLoading(false);
    }
};


export async function validateAnswerApi(questionId, answer, handleResponse, handleError, setLoading) {
    setLoading(true);
    const url = `${BASE_URL}/question`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: questionId, answer })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "unknown error");
        handleResponse(data)
    } catch (err) {
        console.error(err);
        handleError(err.message)
    } finally {
        setLoading(false);
    }
}