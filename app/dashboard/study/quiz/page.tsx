import { Metadata } from "next";
import { Breadcrumb } from "@/components/dashboard/breadcrumb";

export const metadata: Metadata = {
  title: "Practice Quiz | Alif UI",
  description: "Test your knowledge with interactive quizzes",
};

export default function PracticeQuizPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Study", href: "/dashboard/study" },
          { label: "Quiz", href: "/dashboard/study/quiz" }
        ]}
      />
      <h1 className="text-2xl font-bold mb-6">Practice Quiz</h1>
      <p className="text-muted-foreground mb-6">Test your knowledge with interactive quizzes.</p>

      {/* Quiz content */}
      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Quiz</h2>
          <p className="text-muted-foreground mb-4">
            Generate a quiz based on your study materials or select from our pre-made quizzes.
          </p>

          {/* Quiz creation options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
              <h3 className="font-medium mb-2">Generate from Notes</h3>
              <p className="text-sm text-muted-foreground">Create a quiz based on your study notes</p>
            </div>
            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
              <h3 className="font-medium mb-2">Pre-made Quizzes</h3>
              <p className="text-sm text-muted-foreground">Choose from our library of quizzes</p>
            </div>
          </div>
        </div>

        {/* Recent quizzes section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Quizzes</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">You haven't created any quizzes yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
