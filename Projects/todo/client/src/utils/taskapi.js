const BASEURL = import.meta.env.VITE_BASE_URL;

async function fetchTaskAPI(handleResponse, handleError) {
  try {
    ////base URL for api end point

    //endpoint for fetching a data
    const endpoint = "/tasks";

    // construct the full URL using URL endpoint
    const url = `${BASEURL}${endpoint}`;

    //send a GET request to the constructed URL
    const response = await fetch(url, {
      method: "GET",
      credentials: "include"
    });

    //extract json from the response
    const jsonData = await response.json();

    // Check if the response is not successfull
    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown error occured";

      //Throe this error in catch block
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
  const endPoint = `/tasks`;
  const url = `${BASEURL}${endPoint}`;
  setLoading(true);
  try {
    const requestBody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
      credentials: "include"
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
  setLoading
) {
  const endPoint = `/tasks/${taskId}`;
  const url = `${BASEURL}${endPoint}`;
  setLoading(true);
  try {
    const requestBody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });

    console.log(requestBody);

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
      credentials: "include"
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
  const endPoint = `/tasks/${taskId}`;
  const url = `${BASEURL}${endPoint}`;
  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
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

export { fetchTaskAPI, createTaskApi, updateTaskApi, deleteTaskApi };
