import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Settings | Alif UI",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/settings" }
      ]} />
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>
    </div>
  );
}
