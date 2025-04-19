import { Metadata } from "next";
import { Breadcrumb } from "@/components/dashboard/breadcrumb";

export const metadata: Metadata = {
  title: "Study Guide | Alif UI",
  description: "Prepare for your test with our comprehensive study guides",
};

export default function StudyGuidePage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Study", href: "/dashboard/study" },
          { label: "Guide", href: "/dashboard/study/guide" }
        ]}
      />
      <h1 className="text-2xl font-bold mb-6">Study Guide</h1>
      <p className="text-muted-foreground mb-6">Prepare for your test with our comprehensive study guides.</p>

      {/* Study guide content */}
      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <p className="text-muted-foreground mb-4">
            Select a subject to begin creating your personalized study guide.
          </p>

          {/* Subject selection UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {["Mathematics", "Science", "History", "Literature", "Computer Science", "Languages"].map((subject) => (
              <div
                key={subject}
                className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <h3 className="font-medium">{subject}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Recent guides section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Guides</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">You haven't created any study guides yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
