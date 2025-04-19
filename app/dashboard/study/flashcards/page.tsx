import { Metadata } from "next";
import { Breadcrumb } from "@/components/dashboard/breadcrumb";

export const metadata: Metadata = {
  title: "Flashcards | Alif UI",
  description: "Create and study with bite-sized flashcards",
};

export default function FlashcardsPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Study", href: "/dashboard/study" },
          { label: "Flashcards", href: "/dashboard/study/flashcards" }
        ]}
      />
      <h1 className="text-2xl font-bold mb-6">Flashcards</h1>
      <p className="text-muted-foreground mb-6">Create and study with bite-sized flashcards.</p>

      {/* Flashcards content */}
      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create Flashcard Deck</h2>
          <p className="text-muted-foreground mb-4">
            Create a new deck of flashcards for quick study sessions.
          </p>

          {/* Flashcard creation options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
              <h3 className="font-medium mb-2">Create from Scratch</h3>
              <p className="text-sm text-muted-foreground">Build your own custom flashcard deck</p>
            </div>
            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
              <h3 className="font-medium mb-2">Generate from Notes</h3>
              <p className="text-sm text-muted-foreground">Let AI create flashcards from your notes</p>
            </div>
          </div>
        </div>

        {/* Existing decks section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Flashcard Decks</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">You haven't created any flashcard decks yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
