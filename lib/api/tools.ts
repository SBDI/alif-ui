import { API_BASE_URL } from "../constants";

/**
 * Send a chat message and get a response
 */
export async function sendChatMessage(folderId: string, message: string): Promise<{ response: string }> {
  const response = await fetch(`${API_BASE_URL}/tools/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folderId, message }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to send chat message: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Generate a quiz based on folder resources
 */
export async function generateQuiz(folderId: string, params: { 
  numQuestions: number; 
  difficulty: 'easy' | 'medium' | 'hard';
  topics?: string[];
}): Promise<{ questions: Array<{ question: string; options: string[]; answer: string }> }> {
  const response = await fetch(`${API_BASE_URL}/tools/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folderId, ...params }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate quiz: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Generate flashcards based on folder resources
 */
export async function generateFlashcards(folderId: string, params: { 
  numCards: number; 
  topics?: string[];
}): Promise<{ flashcards: Array<{ front: string; back: string }> }> {
  const response = await fetch(`${API_BASE_URL}/tools/flashcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folderId, ...params }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate flashcards: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Generate a study guide based on folder resources
 */
export async function generateStudyGuide(folderId: string, params: { 
  topics?: string[];
  format?: 'outline' | 'detailed' | 'summary';
}): Promise<{ content: string }> {
  const response = await fetch(`${API_BASE_URL}/tools/study-guide`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folderId, ...params }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate study guide: ${response.statusText}`);
  }
  
  return response.json();
}
