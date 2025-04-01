import { useEffect, useState } from "react";
import Card from "./Card";
import "./index.css";
import { ExportImage, RandomQuote } from "./Api";
function App() {
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState("");
  const [error, SetError] = useState("");

  const handleCopy = function () {
    navigator.clipboard.writeText(quote).then(
      () => alert("Quote copied to clipboard!"),
      () => SetError("Failed to copy quote.")
    );
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quote + " - " + "sachin"
    )}&url=${encodeURIComponent(image)}`;
    window.open(tweetUrl, "_blank");
  };

  const handleExport = function () {
    ExportImage(image, handleError);
  };

  const handleResponse = function (response) {
    SetError("");
    setQuote(response?.quote);
    setImage(response?.image);
  };

  const handleError = function (error) {
    SetError(error);
  };

  const handleRandomQuote = function () {
    RandomQuote(handleResponse, handleError);
  };

  useEffect(() => {
    handleRandomQuote(handleResponse, handleError);
  }, []);
  return (
    <>
      <div className="container">
        <Card>
          <img src={image} alt="" />
          <p>{quote}</p>
          <button onClick={handleRandomQuote}>New Quote</button>
          <button onClick={handleCopy}>Copy to ClipBoard</button>
          <button onClick={tweetQuote}>Tweet</button>
          <button onClick={handleExport}>Export</button>
        </Card>
      </div>
      {error && <h1>{error}</h1>}
    </>
  );
}

export default App;
