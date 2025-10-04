import React, { useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

type EmployeeProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePic: string;
  employeeId: string;
  jobTitle: string;
  department: string;
};

interface EmployeeProfileProps {
  employeeName: string;
  onLogout: () => void;
}

export function EmployeeProfile({ employeeName, onLogout }: EmployeeProfileProps) {
  const [profileData, setProfileData] = useState<EmployeeProfileData>(() => {
    const savedProfile = localStorage.getItem('employeeProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      firstName: employeeName.split(" ")[0] || "Employee",
      lastName: employeeName.split(" ")[1] || "User",
      email: `${employeeName.toLowerCase().replace(" ", ".")}@company.com`,
      phone: "+1 (555) 123-4567",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Employee",
      employeeId: "EMP-2024-001",
      jobTitle: "Employee",
      department: "General",
    };
  });
  const [isSaving, setIsSaving] = useState(false);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('employeeProfile', JSON.stringify(profileData));
  }, [profileData]);

  const handleInputChange = (field: keyof EmployeeProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const handleCancel = () => {
    // Reset to the saved profile data
    const savedProfile = localStorage.getItem('employeeProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h3>My Profile</h3>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and account settings
        </p>
      </div>

      <Separator />

      {/* Profile Picture Section */}
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profileData.profilePic} />
          <AvatarFallback className="text-2xl">
            {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Label htmlFor="profile-pic" className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors w-fit">
              <Camera className="h-4 w-4" />
              <span>Change Photo</span>
            </div>
          </Label>
          <input
            id="profile-pic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <p className="text-sm text-muted-foreground mt-2">
            JPG, PNG or GIF. Max size 2MB.
          </p>
        </div>
      </div>

      <Separator />

      {/* Personal Information */}
      <div className="space-y-4">
        <h4>Personal Information</h4>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Work Information */}
      <div className="space-y-4">
        <h4>Work Information</h4>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID / Staff Number</Label>
            <Input
              id="employeeId"
              value={profileData.employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              placeholder="EMP-XXXX-XXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title / Designation</Label>
            <Input
              id="jobTitle"
              value={profileData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="Enter job title"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department / Team</Label>
          <Select 
            value={profileData.department} 
            onValueChange={(value) => handleInputChange("department", value)}
          >
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT & Operations">IT & Operations</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
              <SelectItem value="Product Development">Product Development</SelectItem>
              <SelectItem value="Customer Support">Customer Support</SelectItem>
              <SelectItem value="Administration">Administration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}