import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You'll likely need auth checks here eventually
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto"> {/* Main content area, scrollable */}
        {children}
      </main>
    </div>
  );
} 