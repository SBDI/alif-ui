import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Create New Space | Alif UI",
  description: "Create a new workspace for your projects",
};

export default function NewSpacePage() {
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Space</h1>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Space Details</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Space Name</label>
            <Input 
              placeholder="Enter space name..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <Textarea 
              placeholder="Describe your space..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Space Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select space type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="class">Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4">
            <Button type="submit">
              Create Space
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
