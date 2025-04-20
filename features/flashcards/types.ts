export interface Flashcard {
  front: string;
  back: string;
}

export interface FlashcardDeck {
  id: string;
  folderId: string;
  name: string;
  flashcards: Flashcard[];
  topics?: string[];
  createdAt: string;
}
