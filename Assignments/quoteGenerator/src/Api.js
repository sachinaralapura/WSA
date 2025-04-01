async function RandomQuote(handleResponse, handleError) {
    try {
        const quoteurl = import.meta.env.VITE_QUOTE_URL
        const imageurl = import.meta.env.VITE_RANDOM_IMAGE

        let response = await fetch(quoteurl);
        let data = await response.json();
        const quote = data?.data?.content

        if (!response.ok) {
            throw new Error("Error o ccour while fetching quote")
        }

        let imageResponse = await fetch(imageurl)

        if (!response.ok) {
            throw new Error("Error occur whiel fetching image")
        }
        let image = imageResponse.url
        handleResponse({ quote, image })
    } catch (error) {
        handleError(error.message)
    }
}

async function ExportImage(imageurl, handleError) {
    const filename = "image.jpg"
    try {
        const response = await fetch(imageurl)
        if (!response.ok) {
            throw new Error("Error occur while downloading")
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename
        document.body.appendChild(a);
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
    } catch (error) {
        console.error('Error downloading image:', error);
        handleError(error)
    }
}

export { RandomQuote , ExportImage}

