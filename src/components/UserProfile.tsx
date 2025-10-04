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
import { useProfile } from "../contexts/ProfileContext";

type UserProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePic: string;
  employeeId: string;
  jobTitle: string;
  department: string;
};

export function UserProfile() {
  const { profileData, updateProfileData } = useProfile();
  const [localProfileData, setLocalProfileData] = useState<UserProfileData>(profileData);
  const [isSaving, setIsSaving] = useState(false);

  // Update local profile data when context profile data changes
  useEffect(() => {
    setLocalProfileData(profileData);
  }, [profileData]);

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setLocalProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Update the context profile data
    updateProfileData(localProfileData);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const handleCancel = () => {
    // Reset to the context profile data
    setLocalProfileData(profileData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalProfileData(prev => ({ ...prev, profilePic: reader.result as string }));
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
          <AvatarImage src={localProfileData.profilePic} />
          <AvatarFallback className="text-2xl">
            {localProfileData.firstName.charAt(0)}{localProfileData.lastName.charAt(0)}
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
              value={localProfileData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={localProfileData.lastName}
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
              value={localProfileData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={localProfileData.phone}
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
              value={localProfileData.employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              placeholder="EMP-XXXX-XXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title / Designation</Label>
            <Input
              id="jobTitle"
              value={localProfileData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="Enter job title"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department / Team</Label>
          <Select 
            value={localProfileData.department} 
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