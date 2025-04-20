import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewQuizForm } from "./components/NewQuizForm";
import { useQuiz } from "./hooks/useQuiz";

interface PracticeQuizContainerProps {
  folderId: string;
}

export function PracticeQuizContainer({ folderId }: PracticeQuizContainerProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const { 
    questions, 
    currentQuestionIndex, 
    selectedAnswers, 
    generateQuiz, 
    selectAnswer, 
    nextQuestion, 
    prevQuestion, 
    submitQuiz, 
    isLoading, 
    isSubmitted, 
    score 
  } = useQuiz(folderId);

  const handleStartQuiz = (params: { numQuestions: number; difficulty: string; topics?: string[] }) => {
    generateQuiz({
      numQuestions: params.numQuestions,
      difficulty: params.difficulty as "easy" | "medium" | "hard",
      topics: params.topics,
    });
    setQuizStarted(true);
  };

  const handleNewQuiz = () => {
    setQuizStarted(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Practice Quiz</h1>
      <p className="text-muted-foreground">
        Test your knowledge with practice quizzes based on your resources.
      </p>

      {!quizStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <NewQuizForm onSubmit={handleStartQuiz} folderId={folderId} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Generating your quiz...</p>
                </div>
              </CardContent>
            </Card>
          ) : isSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6">
                    <h2 className="text-2xl font-bold">
                      Your Score: {score}/{questions.length}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      {score === questions.length
                        ? "Perfect score! Excellent work!"
                        : score >= questions.length * 0.7
                        ? "Great job! You're doing well."
                        : "Keep practicing to improve your score."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <p className="font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-2 ml-4">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded-lg ${
                                option === question.answer
                                  ? "bg-green-100 dark:bg-green-900/20"
                                  : selectedAnswers[index] === option &&
                                    option !== question.answer
                                  ? "bg-red-100 dark:bg-red-900/20"
                                  : ""
                              }`}
                            >
                              {option}
                              {option === question.answer && (
                                <span className="ml-2 text-green-600 dark:text-green-400">
                                  ✓ Correct
                                </span>
                              )}
                              {selectedAnswers[index] === option &&
                                option !== question.answer && (
                                  <span className="ml-2 text-red-600 dark:text-red-400">
                                    ✗ Your answer
                                  </span>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button onClick={handleNewQuiz}>Create New Quiz</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg font-medium">{currentQuestion.question}</p>

                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors ${
                          selectedAnswers[currentQuestionIndex] === option
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                        onClick={() => selectAnswer(currentQuestionIndex, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>

                    {currentQuestionIndex === questions.length - 1 ? (
                      <Button onClick={submitQuiz}>Submit Quiz</Button>
                    ) : (
                      <Button onClick={nextQuestion}>Next</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
