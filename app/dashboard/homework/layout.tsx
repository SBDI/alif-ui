import { Breadcrumb } from "@/components/dashboard/breadcrumb";

export default function HomeworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-6">
      <Breadcrumb 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homework", href: "/dashboard/homework" }
        ]} 
      />
      {children}
    </div>
  );
}
