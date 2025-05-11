import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define types for our quiz
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  completed: boolean;
  score: number;
}

// Create the initial quiz questions for "The Creative Soul Explorer"
const initialQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: "When starting a new piece of writing, do you prefer to...",
    options: ["Plan everything in detail", "Start writing and see where it goes", "Think about the ending first", "Draw inspiration from real events"],
    correctAnswer: "Draw inspiration from real events" // Default, all answers are valid
  },
  {
    id: 'q2',
    question: "Which of these natural settings inspires you most?",
    options: ["Peaceful forest", "Ocean waves", "Mountain vista", "Flowing river"],
    correctAnswer: "Peaceful forest" // Default, all answers are valid
  },
  {
    id: 'q3',
    question: "If your writing style was a season, which would it be?",
    options: ["Spring - fresh and renewing", "Summer - vibrant and energetic", "Autumn - reflective and colorful", "Winter - deep and contemplative"],
    correctAnswer: "Autumn - reflective and colorful" // Default, all answers are valid
  },
  {
    id: 'q4',
    question: "Which aspect of Indian culture do you most enjoy incorporating in your stories?",
    options: ["Traditional celebrations", "Historical events", "Family dynamics", "Spiritual elements"],
    correctAnswer: "Family dynamics" // Default, all answers are valid
  },
  {
    id: 'q5',
    question: "What emotion most often drives your writing?",
    options: ["Joy and celebration", "Nostalgia and reflection", "Curiosity and wonder", "Compassion and empathy"],
    correctAnswer: "Compassion and empathy" // Default, all answers are valid
  },
  {
    id: 'q6',
    question: "Which literary device do you find yourself using most often?",
    options: ["Vivid metaphors", "Detailed character descriptions", "Dialogue that reveals personality", "Setting as a reflection of emotion"],
    correctAnswer: "Setting as a reflection of emotion" // Default, all answers are valid
  }
];

// Load saved state from localStorage if available
const loadSavedState = (): QuizState | null => {
  if (browser) {
    const savedState = localStorage.getItem('mothers-day-quiz');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Failed to parse saved quiz state', e);
      }
    }
  }
  return null;
};

// Create the quiz store
function createQuizStore() {
  // Initial state
  const savedState = loadSavedState();
  const initialState: QuizState = savedState || {
    currentQuestionIndex: 0,
    questions: initialQuestions,
    completed: false,
    score: 0
  };
  
  const { subscribe, update } = writable(initialState);
  
  // Save state to localStorage
  const saveState = (state: QuizState) => {
    if (browser) {
      localStorage.setItem('mothers-day-quiz', JSON.stringify(state));
    }
  };
  
  return {
    subscribe,
    
    // Answer the current question
    answerQuestion: (answer: string) => {
      update(state => {
        const newState = { ...state };
        const currentQuestion = newState.questions[newState.currentQuestionIndex];
        
        // Set the user's answer
        currentQuestion.userAnswer = answer;
        
        // Update score if correct
        if (answer === currentQuestion.correctAnswer) {
          newState.score += 1;
        }
        
        // Move to next question or complete quiz
        if (newState.currentQuestionIndex < newState.questions.length - 1) {
          newState.currentQuestionIndex += 1;
        } else {
          newState.completed = true;
        }
        
        saveState(newState);
        return newState;
      });
    },
    
    // Reset the quiz
    resetQuiz: () => {
      update(state => {
        const newState: QuizState = {
          currentQuestionIndex: 0,
          questions: initialQuestions.map(q => ({ ...q, userAnswer: undefined })),
          completed: false,
          score: 0
        };
        
        saveState(newState);
        return newState;
      });
    },
    
    // Get the current question
    getCurrentQuestion: (state: QuizState) => {
      return state.questions[state.currentQuestionIndex];
    }
  };
}

export const quizStore = createQuizStore();
