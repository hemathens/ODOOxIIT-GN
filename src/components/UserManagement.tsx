import { useState, useEffect } from "react";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type User = {
  id: string;
  name: string;
  role: "Employee" | "Manager" | "Finance Director" | "Admin" | string;
  manager: string;
  email: string;
};

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Manager",
    manager: "-",
    email: "john.smith@company.com",
  },
  {
    id: "2",
    name: "Emily Davis",
    role: "Employee",
    manager: "John Smith",
    email: "emily.davis@company.com",
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Employee",
    manager: "John Smith",
    email: "michael.brown@company.com",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    role: "Admin",
    manager: "-",
    email: "sarah.johnson@company.com",
  },
  {
    id: "5",
    name: "David Wilson",
    role: "Manager",
    manager: "-",
    email: "david.wilson@company.com",
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUserRole, setNewUserRole] = useState<string>("");
  const [newUserManager, setNewUserManager] = useState<string>("");
  const [showCustomRoleInput, setShowCustomRoleInput] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "default";
      case "Manager":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    // Determine the role to use (custom or selected)
    const roleToUse = showCustomRoleInput ? customRole : newUserRole;
    
    // For Manager, Admin, and Finance Director roles, set manager to "-"
    let managerToUse = newUserManager;
    if (roleToUse === "manager" || roleToUse === "Manager" || 
        roleToUse === "admin" || roleToUse === "Admin" || 
        roleToUse === "finance-director" || roleToUse === "Finance Director") {
      managerToUse = "-";
    }
    
    // Format role for display
    let formattedRole = roleToUse;
    if (roleToUse === "employee") formattedRole = "Employee";
    else if (roleToUse === "manager") formattedRole = "Manager";
    else if (roleToUse === "admin") formattedRole = "Admin";
    else if (roleToUse === "finance-director") formattedRole = "Finance Director";
    else if (roleToUse === "cfo") formattedRole = "CFO";
    
    // Create new user object
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: newUserName,
      role: formattedRole,
      manager: managerToUse || "-",
      email: newUserEmail,
    };
    
    // Add new user to the list
    setUsers([...users, newUser]);
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    setNewUserRole("");
    setShowCustomRoleInput(false);
    setCustomRole("");
    setNewUserName("");
    setNewUserEmail("");
    setNewUserManager("");
  };

  const handleEditUser = () => {
    if (!editingUser) return;
    
    // Determine the role to use
    const roleToUse = showCustomRoleInput ? customRole : newUserRole;
    
    // For Manager, Admin, Finance Director, and CFO roles, set manager to "-"
    let managerToUse = newUserManager;
    if (roleToUse === "manager" || roleToUse === "Manager" || 
        roleToUse === "admin" || roleToUse === "Admin" || 
        roleToUse === "finance-director" || roleToUse === "Finance Director" ||
        roleToUse === "cfo" || roleToUse === "CFO") {
      managerToUse = "-";
    }
    
    // Format role for display
    let formattedRole = roleToUse;
    if (roleToUse === "employee") formattedRole = "Employee";
    else if (roleToUse === "manager") formattedRole = "Manager";
    else if (roleToUse === "admin") formattedRole = "Admin";
    else if (roleToUse === "finance-director") formattedRole = "Finance Director";
    else if (roleToUse === "cfo") formattedRole = "CFO";
    
    // Update user
    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? { 
            ...user, 
            role: formattedRole, 
            manager: managerToUse || user.manager 
          } 
        : user
    ));
    
    // Close dialog and reset form
    setIsEditDialogOpen(false);
    setEditingUser(null);
    setNewUserRole("");
    setShowCustomRoleInput(false);
    setCustomRole("");
    setNewUserManager("");
  };

  const handleNewUserRoleChange = (value: string) => {
    if (value === "add-new-role") {
      setShowCustomRoleInput(true);
      setNewUserRole("");
    } else {
      setShowCustomRoleInput(false);
      setNewUserRole(value);
      
      // For Manager, Admin, Finance Director, and CFO roles, set manager to "-"
      if (value === "manager" || value === "admin" || value === "finance-director" || value === "cfo") {
        setNewUserManager("-");
      } else {
        setNewUserManager("");
      }
    }
  };

  const handleEditUserRoleChange = (value: string) => {
    if (value === "add-new-role") {
      setShowCustomRoleInput(true);
      setNewUserRole("");
    } else {
      setShowCustomRoleInput(false);
      setNewUserRole(value);
      
      // For Manager, Admin, Finance Director, and CFO roles, set manager to "-"
      if (value === "manager" || value === "admin" || value === "finance-director" || value === "cfo") {
        setNewUserManager("-");
      } else {
        setNewUserManager("");
      }
    }
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setNewUserRole(user.role);
    setNewUserManager(user.manager);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>User Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-md">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account and assign their role
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter full name" 
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="user@company.com" 
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={handleNewUserRoleChange} value={showCustomRoleInput ? "add-new-role" : newUserRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="finance-director">Finance Director</SelectItem>
                    <SelectItem value="cfo">CFO</SelectItem>
                    <SelectItem value="add-new-role">Add New Role</SelectItem>
                  </SelectContent>
                </Select>
                
                {showCustomRoleInput && (
                  <div className="mt-2">
                    <Input 
                      placeholder="Enter new role" 
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                    />
                  </div>
                )}
              </div>
              
              {(newUserRole === "employee" || newUserRole === "") && !showCustomRoleInput && (
                <div className="grid gap-2">
                  <Label htmlFor="manager">Assign Manager</Label>
                  <Select 
                    value={newUserManager}
                    onValueChange={setNewUserManager}
                  >
                    <SelectTrigger id="manager">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="David Wilson">David Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsDialogOpen(false);
                // Reset form state when canceling
                setNewUserRole("");
                setShowCustomRoleInput(false);
                setCustomRole("");
                setNewUserName("");
                setNewUserEmail("");
                setNewUserManager("");
              }}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-green-500"
                onClick={handleAddUser}
                disabled={!newUserName || !newUserEmail || (!newUserRole && !showCustomRoleInput) || (showCustomRoleInput && !customRole)}
              >
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>User Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Manager Assigned</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow 
                key={user.id}
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.manager}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => openEditDialog(user)}
                      disabled={user.role === "Admin"}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Edit user role and manager assignment
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name" 
                  value={editingUser.name}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={editingUser.email}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  onValueChange={handleEditUserRoleChange} 
                  value={showCustomRoleInput ? "add-new-role" : newUserRole}
                  disabled={editingUser.role === "Admin"}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="finance-director">Finance Director</SelectItem>
                    <SelectItem value="cfo">CFO</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="add-new-role">Add New Role</SelectItem>
                  </SelectContent>
                </Select>
                
                {showCustomRoleInput && (
                  <div className="mt-2">
                    <Input 
                      placeholder="Enter new role" 
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                    />
                  </div>
                )}
              </div>
              
              {(newUserRole === "employee" || newUserRole === "Employee" || newUserRole === "") && !showCustomRoleInput && (
                <div className="grid gap-2">
                  <Label htmlFor="edit-manager">Assign Manager</Label>
                  <Select 
                    value={newUserManager}
                    onValueChange={setNewUserManager}
                  >
                    <SelectTrigger id="edit-manager">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {users
                        .filter(u => u.role === "Manager" || u.role === "Admin")
                        .map(manager => (
                          <SelectItem key={manager.id} value={manager.name}>
                            {manager.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingUser(null);
              // Reset form state when canceling
              setNewUserRole("");
              setShowCustomRoleInput(false);
              setCustomRole("");
              setNewUserManager("");
            }}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-green-500"
              onClick={handleEditUser}
              disabled={!editingUser || (editingUser.role === "Admin")}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}