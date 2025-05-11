import { Metadata } from "next";
import { SolveContainer } from "@/features/solve/SolveContainer";

export const metadata: Metadata = {
  title: "Solve | Alif",
  description: "Get help solving problems",
};

export default function SolvePage({ params }: { params: { folderId: string } }) {
  return (
    <SolveContainer folderId={params.folderId} />
  );
} 