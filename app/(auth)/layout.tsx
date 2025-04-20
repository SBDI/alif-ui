import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Alif UI",
  description: "Authentication pages for Alif UI",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
