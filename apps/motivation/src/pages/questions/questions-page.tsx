import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './questions-page.module.scss';

export function QuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categoryPoints, setCategoryPoints] = useState<{
    [categoryId: number]: number;
  }>({});
  const history = useHistory();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('assets/data/questions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data.questions || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const handleOptionClick = (points: number, categoryId: number) => {
    const updatedPoints = {
      ...categoryPoints,
      [categoryId]: (categoryPoints[categoryId] || 0) + points,
    };
    setCategoryPoints(updatedPoints);
    console.log('Category Points:', updatedPoints);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (Object.keys(updatedPoints).length === 4) {
        history.push('/results', { categoryPoints: updatedPoints });
      } else {
        setCurrentQuestionIndex(0);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.questionHeadline}>
        Frage {currentQuestionIndex + 1} von {questions.length}
      </h1>
      {loading && <p>Loading questions...</p>}
      {!loading && questions.length === 0 && <p>No questions available.</p>}
      {questions.length > 0 && (
        <div
          className={styles.questionContainer}
          key={questions[currentQuestionIndex].id}
        >
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className={styles.buttonContainer}>
            {questions[currentQuestionIndex].options.map(
              (option: any, index: number) => (
                <button
                  key={index}
                  className={styles.optionButton}
                  onClick={() =>
                    handleOptionClick(
                      option.points,
                      questions[currentQuestionIndex].categoryId
                    )
                  }
                >
                  {option.text}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
