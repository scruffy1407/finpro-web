// 'use client';

// import { useState } from 'react';
// import { questions } from '@/data/questions';
// import { testConfig } from '@/data/testConfig';
// import { QuizCard } from '@/components/QuizCard';
// import { QuizProgress } from '@/components/QuizProgress';
// import { QuizTimer } from '@/components/QuizTimer';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
// import { useToast } from "@/components/ui/use-toast";
// import type { QuizState, QuizSubmission } from '@/types/quiz';

// export default function Quiz() {
//   const { toast } = useToast();
//   const [quizState, setQuizState] = useState<QuizState>({
//     currentQuestionIndex: 0,
//     answers: {},
//     score: 0,
//     testId: testConfig.data.preSelectionTest.test_id,
//     jobHunterId: 5,
//     applicationId: 25,
//   });

//   const currentQuestion = questions.questions[quizState.currentQuestionIndex];
//   const totalQuestions = questions.questions.length;
//   const isLastQuestion = quizState.currentQuestionIndex === totalQuestions - 1;
//   const isFirstQuestion = quizState.currentQuestionIndex === 0;
//   const hasAnswered = quizState.answers[currentQuestion.question_id];

//   const handleAnswerSelect = (answer: string) => {
//     setQuizState((prev) => ({
//       ...prev,
//       answers: {
//         ...prev.answers,
//         [currentQuestion.question_id]: answer,
//       },
//     }));
//   };

//   const handleNext = () => {
//     if (isLastQuestion) {
//       return;
//     }

//     setQuizState((prev) => ({
//       ...prev,
//       currentQuestionIndex: prev.currentQuestionIndex + 1,
//     }));
//   };

//   const handlePrevious = () => {
//     if (isFirstQuestion) {
//       return;
//     }

//     setQuizState((prev) => ({
//       ...prev,
//       currentQuestionIndex: prev.currentQuestionIndex - 1,
//     }));
//   };

//   const handleTimeUp = () => {
//     toast({
//       title: "Time's Up!",
//       description: "Your quiz has been automatically submitted.",
//       variant: "destructive",
//     });
//     formatSubmission();
//   };

//   const formatSubmission = (): QuizSubmission => {
//     const formattedAnswers = questions.questions.map((q) => ({
//       question_id: q.question_id,
//       chosen_answer: quizState.answers[q.question_id] || '',
//     }));

//     const submission = {
//       testId: quizState.testId,
//       jobHunterId: quizState.jobHunterId,
//       applicationId: quizState.applicationId,
//       answers: formattedAnswers,
//     };

//     console.log('Quiz Submission:', JSON.stringify(submission, null, 2));
    
//     toast({
//       title: "Quiz Submitted",
//       description: `Submitted ${formattedAnswers.length} answers successfully`,
//     });

//     return submission;
//   };

//   if (!currentQuestion) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
//         <Card className="w-full max-w-2xl p-8 text-center animate-in fade-in zoom-in">
//           <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
//           <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
//           <p className="text-xl mb-6">
//             You answered {Object.keys(quizState.answers).length} questions
//           </p>
//           <Button
//             onClick={() => setQuizState({
//               currentQuestionIndex: 0,
//               answers: {},
//               score: 0,
//               testId: testConfig.data.preSelectionTest.test_id,
//               jobHunterId: 5,
//               applicationId: 25,
//             })}
//           >
//             Start Over
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
//       <div className="w-full max-w-2xl mb-4">
//         <QuizTimer 
//           duration={testConfig.data.preSelectionTest.duration} 
//           onTimeUp={handleTimeUp}
//         />
//       </div>
//       <QuizProgress
//         current={quizState.currentQuestionIndex}
//         total={totalQuestions}
//       />
//       <QuizCard
//         question={currentQuestion}
//         selectedAnswer={quizState.answers[currentQuestion.question_id]}
//         onAnswerSelect={handleAnswerSelect}
//       />
//       <div className="mt-6 flex gap-4">
//         <Button
//           size="lg"
//           variant="outline"
//           onClick={handlePrevious}
//           disabled={isFirstQuestion}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Previous
//         </Button>
//         <Button
//           size="lg"
//           onClick={handleNext}
//           disabled={!hasAnswered}
//         >
//           {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
//           {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
//         </Button>
//       </div>
//     </div>
//   );
// }