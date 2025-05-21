const BASEURL = import.meta.env.VITE_BASE_URL;

async function fetchTaskAPI(handleResponse, handleError, options = {}) {
    try {
        //base URL for api end point

        //endpoint for fetching a data
        const endpoint = "/api/v2/tasks";

        // construct the full URL using URL endpoint
        const url = new URL(endpoint, BASEURL);

        // Append  sort option
        if (options.sortOption) {
            url.searchParams.append("sort_by", options.sortOption);
            url.searchParams.append("sort_type", "asc");
        }

        // Append  selected status as query parameters is provided
        if (options.selectedStatus?.length) {
            //convert array to json string
            const status = JSON.stringify(options.selectedStatus);
            url.searchParams.append("status", status);
        }

        // append labels as query parameters
        if (options.selectedLabels?.length) {
            const labels = JSON.stringify(options.selectedLabels);
            url.searchParams.append("labels", labels);
        }

        //send a GET request to the constructed URL
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        //extract json from the response
        const jsonData = await response.json();

        // Check if the response is not successfull
        if (!response.ok) {
            const errorMessage = jsonData.message || "Unknown error occured";

            //Throw this error in catch block
            throw new Error(errorMessage);
        }

        console.log(jsonData);
        //pass the fetched data to the handle Response function for further processing
        handleResponse(jsonData);
    } catch (error) {
        handleError(error);
    }
}

async function createTaskApi(values, handleResponse, handleError, setLoading) {
    const endPoint = `/api/v2/tasks`;
    setLoading(true);
    try {
        const url = new URL(endPoint, BASEURL);
        const requestBody = JSON.stringify({
            title: values.taskTitle,
            description: values.taskDescription,
            due_date: values.taskDueDate?.toISOString(),
        });
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.message || "Unknown error occured";
            throw new Error(errorMessage);
        }
        handleResponse(data);
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || error.message || "Unknown Error";
        handleError(new Error(errorMessage));
    } finally {
        setLoading(false);
    }
}

async function updateTaskApi(
    values,
    taskId,
    handleResponse,
    handleError,
    setLoading,
) {
    const endPoint = `/api/v2/tasks/${taskId}`;
    setLoading(true);
    try {
        const url = new URL(endPoint, BASEURL);
        const requestBody = JSON.stringify({
            title: values.taskTitle,
            description: values.taskDescription,
            due_date: values.taskDueDate?.toISOString(),
        });
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.message || "Unknown error occured";
            throw new Error(errorMessage);
        }
        handleResponse(data);
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || error.message || "Unknown Error";
        handleError(new Error(errorMessage));
    } finally {
        setLoading(false);
    }
}

async function deleteTaskApi(taskId, handleResponse, handleError, setLoading) {
    const endPoint = `/api/v2/tasks/${taskId}`;
    setLoading(true);
    try {
        const url = new URL(endPoint, BASEURL);
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.message || "Unknown error occured";
            throw new Error(errorMessage);
        }
        handleResponse(data);
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || error.message || "Unknown Error";
        handleError(new Error(errorMessage));
    } finally {
        setLoading(false);
    }
}

async function updateLabelApi(
    labels,
    taskId,
    handleResponse,
    handleError,
    setLoading,
) {
    try {
        const endpoint = `/api/v2/tasks/${taskId}/labels`;
        const url = new URL(endpoint, BASEURL);

        const requestBody = JSON.stringify({ labels });
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
            credentials: "include",
        });

        const jsonData = await response.json();

        if (!response.ok) {
            const errorMessage = jsonData.message || "Unknown Error occured";
            throw new Error(errorMessage);
        }
        handleResponse(jsonData);
    } catch (error) {
        handleError(error);
    }
}

async function getLabelsApi(handleResponse, handleError) {
    try {
        const endpoint = `/api/v2/tasks/labels`;
        const url = new URL(endpoint, BASEURL);

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        const jsonData = await response.json();

        if (!response.ok) {
            const errorMessage = jsonData.message || "Unknown Error occured";
            throw new Error(errorMessage);
        }
        handleResponse(jsonData);
    } catch (error) {
        handleError(error);
    }
}

async function changeStatusApi(
    status,
    taskId,
    handleResponse,
    handleError,
    setLoading,
) {
    setLoading(true);
    try {
        const endPoint = `/api/v2/tasks/${taskId}/status`;
        const url = new URL(endPoint, BASEURL);
        const requestBody = JSON.stringify({ status });
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
            credentials: "include",
        });

        const jsonData = await response.json();
        if (!response.ok) {
            const errorMessage = jsonData.message || "Unknown Error occured";
            throw new Error(errorMessage);
        }
        handleResponse(jsonData);
    } catch (error) {
        handleError(error);
    } finally {
        setLoading(false);
    }
}

export {
    fetchTaskAPI,
    createTaskApi,
    updateTaskApi,
    deleteTaskApi,
    updateLabelApi,
    getLabelsApi,
    changeStatusApi,
};
