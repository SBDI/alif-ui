import { Breadcrumb } from "@/components/dashboard/breadcrumb";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-6">
      <Breadcrumb 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Study", href: "/dashboard/study" }
        ]} 
      />
      {children}
    </div>
  );
}
