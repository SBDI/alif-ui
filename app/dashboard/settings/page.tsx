import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Settings | Alif UI",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Account Information</h2>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
            </div>
            
            <Button>Save Changes</Button>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Password</h2>
            <Separator />
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            
            <Button>Update Password</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Theme</h2>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
              </div>
              <Switch />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Study Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminders for scheduled study sessions</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Homework Deadlines</p>
                  <p className="text-sm text-muted-foreground">Get alerts for upcoming homework deadlines</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Privacy Settings</h2>
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Collection</p>
                  <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve your experience</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
