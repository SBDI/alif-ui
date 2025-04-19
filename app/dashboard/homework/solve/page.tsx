import { Metadata } from "next";
import { Breadcrumb } from "@/components/dashboard/breadcrumb";

export const metadata: Metadata = {
  title: "Solve Problems | Alif UI",
  description: "Get answers and explanations for your homework problems",
};

export default function SolveProblemsPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homework", href: "/dashboard/homework" },
          { label: "Solve", href: "/dashboard/homework/solve" }
        ]}
      />
      <h1 className="text-2xl font-bold mb-6">Solve Problems</h1>
      <p className="text-muted-foreground mb-6">Get answers and explanations for your homework problems.</p>

      {/* Problem solving content */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Get Answers and Explanations</h2>
        <p className="text-muted-foreground mb-4">
          Upload a problem or type it below to get step-by-step solutions.
        </p>

        {/* Problem input UI */}
        <div className="mt-6 space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
            <p className="font-medium">Drop your image here</p>
            <p className="text-sm text-muted-foreground mt-2">or click to upload</p>
          </div>

          <div className="relative">
            <textarea
              className="w-full min-h-[200px] p-4 border rounded-lg"
              placeholder="Or type your problem here..."
            />
            <button className="absolute bottom-4 right-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
              Solve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
