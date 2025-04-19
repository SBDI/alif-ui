import { Metadata } from "next";
import { Breadcrumb } from "@/components/dashboard/breadcrumb";

export const metadata: Metadata = {
  title: "Writing Assistant | Alif UI",
  description: "Draft paragraphs or papers with AI assistance",
};

export default function WritingAssistantPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homework", href: "/dashboard/homework" },
          { label: "Write", href: "/dashboard/homework/write" }
        ]}
      />
      <h1 className="text-2xl font-bold mb-6">Writing Assistant</h1>
      <p className="text-muted-foreground mb-6">Draft paragraphs or papers with AI assistance.</p>

      {/* Writing assistant content */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Draft Papers or Essays</h2>
        <p className="text-muted-foreground mb-4">
          Get help with drafting, editing, or improving your written work.
        </p>

        {/* Writing interface */}
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Topic or Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter the topic or title of your paper..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Instructions</label>
            <textarea
              className="w-full min-h-[100px] p-2 border rounded-lg"
              placeholder="Describe what you need help with..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Your Draft (Optional)</label>
            <textarea
              className="w-full min-h-[200px] p-2 border rounded-lg"
              placeholder="Paste your existing draft here if you have one..."
            />
          </div>

          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            Generate Draft
          </button>
        </div>
      </div>
    </div>
  );
}
