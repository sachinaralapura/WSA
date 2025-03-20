import { useState, useEffect } from "react";
const BASEURL = import.meta.env.VITE_BASE_URL;

function useFetchTasks() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const endPoint = `/tasks`;
  const url = `${BASEURL}${endPoint}`;

  useEffect(() => {
    const abortController = new AbortController(); // For cleanup
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json.tasks);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted"); // handle abort error quietly
        } else {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort(); // Cleanup on unmount or url change
    };
  }, [url]); // Re-run effect when url changes

  return { data, isLoading, error };
}
export default useFetchTasks;
