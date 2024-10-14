'use client'
import { Option, Question } from "@prisma/client"
import Image from "next/image";
import { useEffect, useState } from "react";

interface QuizProps{
    questions:Question[] & {
      options:Option[]
    }
}

const QuizComp = ({questions}:QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (questions.length > 0) {
      setLoading(false);
      const initialSelectedOptions = questions.map(() => null);
      setSelectedOptions(initialSelectedOptions);
    }
  }, [questions]);

  const handleOptionSelect = (questionIndex: number, option: Option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);

    // Update score
    const previouslySelectedOption = selectedOptions[questionIndex];
    if (previouslySelectedOption && previouslySelectedOption.isCorrect) {
      setScore(score - 1); // Subtract previous score
    }
    if (option.isCorrect) {
      setScore(score + 1); // Add new score
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestartClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    const initialSelectedOptions = questions.map(() => null);
    setSelectedOptions(initialSelectedOptions);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-gray-900 rounded-lg shadow-md text-white">
      {showResults ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-xl font-semibold mb-2">
            Your score: {score}/{questions.length}
          </p>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <h3 className="text-lg font-bold mb-1">
                Question {index + 1}: {question.text}
              </h3>
              <p className="text-gray-600 mb-1">
                Correct answer:{" "}
                {question.options.find((option) => option.isCorrect).text}
              </p>
              <p className="text-gray-600 mb-1">
                Your answer:{" "}
                {selectedOptions[index]
                  ? selectedOptions[index].text
                  : "Not attempted"}
              </p>
              {selectedOptions[index] && selectedOptions[index].isCorrect ? (
                <p className="text-green-500 font-semibold">Correct!</p>
              ) : (
                <p className="text-red-500 font-semibold">Incorrect</p>
              )}
            </div>
          ))}
          <button
            onClick={handleRestartClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="text-lg font-semibold mb-2">
            {questions[currentQuestion].text}
          </p>
          {questions[currentQuestion]?.imageUrl && (
                <Image
                  src={questions[currentQuestion].imageUrl}
                  alt="Question Image"
                  className="mb-2 rounded object-cover"
                  width={1000}
                  height={1000}
                />
              )}
          <ul>
            {questions[currentQuestion].options.map((option: Option) => (
              <li key={option.id} className="mb-2">
                <input
                  type="radio"
                  name="option"
                  value={option.id}
                  checked={selectedOptions[currentQuestion] && selectedOptions[currentQuestion].id === option.id}
                  onChange={() => handleOptionSelect(currentQuestion, option)}
                  className="mr-2"
                />
                <span> {option.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousClick}
              disabled={currentQuestion === 0}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              disabled={!selectedOptions[currentQuestion]}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComp