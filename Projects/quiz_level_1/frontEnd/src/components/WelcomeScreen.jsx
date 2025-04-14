import React, { useState } from "react";
import { Button, Card, QuizLogo } from "./ui";
import { CheckGreen, QuestionBubble } from "../assets";
import { useScreen } from "../context/screen";

export default function WelcomeScreen() {
  const [loading, setLoading] = useState(false);
  const { showQuestionScreen } = useScreen();
  const beginQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/question", {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) throw new Error("error fetching questions");
      console.log(data);
      showQuestionScreen();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="welcome-section">
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={QuestionBubble} alt="" width={172} />
          <h2>Are you ready?</h2>
          <h3>Let's see how many questions you can answer:</h3>
        </div>
        <ul className="welcome-card-list">
          <li className="list-item">
            <img src={CheckGreen} alt="" />
            There are 30 Questions
          </li>
          <li className="list-item">
            <img src={CheckGreen} alt="" />
            You need to pick 1 answer
          </li>
        </ul>

        <Button
          size="large"
          onClick={beginQuiz}
          loadingText="Starting the quiz"
          loading={loading}
        >
          I'm Ready
        </Button>
      </Card>
    </section>
  );
}
