# Admin Portal - Expense Management System

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A comprehensive multi-role expense management system built with React, TypeScript, and modern UI components**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Team](#team)

</div>

**Team NeoByte**

|               Role              |         Name         |                                                                                  GitHub                                                                                 |                                                                                             LinkedIn                                                                                             |
| :-----------------------------: | :------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Team Leader / Backend Developer |       Hem Patel      |             [![GitHub](https://img.shields.io/badge/GitHub-hemathens-181717?style=flat-square\&logo=github\&logoColor=white)](https://github.com/hemathens)             |             [![LinkedIn](https://img.shields.io/badge/LinkedIn-Hem%20Ajit%20Patel-0A66C2?style=flat-square\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/hem-patel19)            |
|        Frontend Developer       | Harshdeepsinh Jadeja | [![GitHub](https://img.shields.io/badge/GitHub-harshdeepsinhjadeja27-181717?style=flat-square\&logo=github\&logoColor=white)](https://github.com/harshdeepsinhjadeja27) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-Harshdeepsinh%20Jadeja-0A66C2?style=flat-square\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/jadeja-harshdeepsinh-74ab16321) |
|         System Architect        |  Karmadeepsinh Gohil |             [![GitHub](https://img.shields.io/badge/GitHub-kdgohil01-181717?style=flat-square\&logo=github\&logoColor=white)](https://github.com/kdgohil01)             |  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Karmadeepsinh%20Gohil-0A66C2?style=flat-square\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/karmadeepsinh-gohil-31484230a)  |
|          Documentation          |    Meet Sanchaniya   |                [![GitHub](https://img.shields.io/badge/GitHub-Meet--4-181717?style=flat-square\&logo=github\&logoColor=white)](https://github.com/Meet-4)               |      [![LinkedIn](https://img.shields.io/badge/LinkedIn-Meet%20Sanchaniya-0A66C2?style=flat-square\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/meet-sanchaniya-2a4193338)      |

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [User Roles & Access](#user-roles--access)
- [Key Components](#key-components)
- [Authentication](#authentication)
- [Data Management](#data-management)
- [UI Components](#ui-components)
- [Team](#team)
- [License](#license)

---

## 🌟 Overview

The **Admin Portal - Expense Management System** is a modern, role-based web application designed to streamline expense tracking, approval workflows, and financial management across organizations. Built with cutting-edge technologies, it provides distinct interfaces for Admins, Managers, and Employees, each tailored to their specific needs.

### Key Highlights

- **Multi-Role Architecture**: Separate dashboards for Admin, Manager, and Employee roles
- **Real-time Expense Tracking**: Submit, track, and manage expenses with ease
- **Approval Workflows**: Configurable approval rules and multi-level authorization
- **Currency Conversion**: Built-in currency converter for international expenses
- **Receipt Management**: Upload and attach receipts to expense claims
- **Profile Management**: Comprehensive user profile and settings management
- **Responsive Design**: Fully responsive UI that works on all devices

---

## ✨ Features

### Admin Features
- 📊 **Dashboard Overview**: Real-time statistics and activity monitoring
- 👥 **User Management**: Create, edit, and manage user accounts and roles
- ⚙️ **Approval Rules**: Configure multi-level approval workflows
- 💰 **Expense Overview**: Monitor all expenses across the organization
- 📈 **Analytics**: View expense trends and patterns
- 🔧 **Settings**: System-wide configuration and preferences

### Manager Features
- 📋 **Team Expense Management**: Review and approve team member expenses
- ✅ **Approval Actions**: Approve or reject expense requests with comments
- 👁️ **Team Overview**: Monitor team expense statistics
- 📊 **Dashboard Analytics**: Track team spending patterns
- 👤 **Profile Management**: Manage personal profile and preferences

### Employee Features
- ➕ **Expense Submission**: Create and submit expense claims
- 📎 **Receipt Upload**: Attach receipts and supporting documents
- 💱 **Currency Conversion**: Convert expenses to company base currency
- 📝 **Expense Tracking**: Monitor status of submitted expenses
- 🔍 **Expense Filters**: Filter and search through personal expenses
- 📊 **Expense Analytics**: View personal spending statistics

---

## 🛠️ Tech Stack

### Frontend Framework
- **React** (v18.3.1) - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript for robust development
- **Vite** (v6.3.5) - Next-generation frontend build tool

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React component library
- **Radix UI** - Unstyled, accessible component primitives
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Hover Card, Label, Menubar
  - Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Slider, Switch
  - Tabs, Toggle, Tooltip, and more

### State Management & Utilities
- **React Hook Form** (v7.55.0) - Performant form validation
- **class-variance-authority** (v0.7.1) - CSS class variance management
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind CSS classes

### Data Visualization
- **Recharts** (v2.15.2) - Composable charting library

### UI Enhancement Libraries
- **Lucide React** (v0.487.0) - Beautiful & consistent icon toolkit
- **Sonner** (v2.0.3) - Toast notifications
- **Vaul** (v1.1.2) - Drawer component
- **next-themes** (v0.4.6) - Theme management
- **react-day-picker** (v8.10.1) - Date picker component
- **embla-carousel-react** (v8.6.0) - Carousel component
- **cmdk** (v1.1.1) - Command menu component
- **input-otp** (v1.4.2) - OTP input component
- **react-resizable-panels** (v2.1.7) - Resizable panel layouts

### Development Tools
- **@vitejs/plugin-react-swc** (v3.10.2) - Fast React refresh with SWC
- **@types/node** (v20.10.0) - TypeScript definitions for Node.js

---

## 📁 Project Structure

```
Admin-Portal-main/
│
├── src/
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components (48 files)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (and more)
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── expenseSync.ts   # Expense synchronization logic
│   │   │   └── testExpenseSync.ts
│   │   │
│   │   ├── figma/               # Figma design assets
│   │   │
│   │   ├── AddExpenseForm.tsx   # Expense creation form
│   │   ├── ApprovalModal.tsx    # Approval dialog component
│   │   ├── ApprovalRules.tsx    # Approval rules management
│   │   ├── CurrencyConverter.tsx # Currency conversion utility
│   │   ├── DashboardOverview.tsx # Admin dashboard
│   │   ├── EmployeeDashboard.tsx # Employee portal
│   │   ├── EmployeeProfile.tsx   # Employee profile page
│   │   ├── ExpenseDashboard.tsx  # Expense analytics
│   │   ├── ExpenseFilters.tsx    # Expense filtering
│   │   ├── ExpenseTable.tsx      # Expense data table
│   │   ├── ExpensesOverview.tsx  # Expense overview page
│   │   ├── LoginPage.tsx         # Authentication page
│   │   ├── ManagerDashboard.tsx  # Manager portal
│   │   ├── ManagerProfile.tsx    # Manager profile page
│   │   ├── ReceiptUpload.tsx     # Receipt upload component
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── TeamExpensesTable.tsx # Team expense table
│   │   ├── TopNav.tsx            # Top navigation bar
│   │   ├── UserManagement.tsx    # User CRUD operations
│   │   └── UserProfile.tsx       # User profile component
│   │
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Authentication context
│   │   └── ProfileContext.tsx   # User profile context
│   │
│   ├── services/                # API and service layers
│   │   ├── authService.ts       # Authentication service
│   │   └── testAuthService.ts   # Auth service tests
│   │
│   ├── styles/                  # Global styles
│   │   └── globals.css          # Global CSS styles
│   │
│   ├── guidelines/              # Development guidelines
│   │
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Tailwind CSS imports
│   └── Attributions.md          # Third-party attributions
│
├── public/                      # Static assets
│
├── employee/                    # Employee portal module
├── Manager-s-View-in-Expense-Management-System-main/
│                               # Manager portal module
│
├── index.html                   # HTML entry point
├── vite.config.ts              # Vite configuration
├── package.json                # Project dependencies
├── package-lock.json           # Dependency lock file
├── .gitignore                  # Git ignore rules
├── .gitattributes              # Git attributes
├── README.md                   # Original README
└── testing.md                  # This file

```

### Key Directories Explained

- **`/src/components`**: All React components including UI elements and feature components
- **`/src/components/ui`**: Reusable UI components from shadcn/ui library
- **`/src/contexts`**: React Context providers for global state management
- **`/src/services`**: Business logic and API service layers
- **`/src/styles`**: Global CSS and styling files

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Admin-Portal-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The production-ready files will be generated in the `build/` directory.

---

## 👥 User Roles & Access

### Default Login Credentials

#### Admin Access
- **Email**: `admin@company.com`
- **Password**: `admin123`
- **Role**: Admin

#### Manager Access
- **Email**: `manager@company.com`
- **Password**: `manager123`
- **Role**: Manager

#### Employee Access
- **Email**: `employee@company.com`
- **Password**: `employee123`
- **Role**: Employee

### Role Permissions

| Feature | Admin | Manager | Employee |
|---------|-------|---------|----------|
| Dashboard Overview | ✅ | ✅ | ✅ |
| Submit Expenses | ❌ | ❌ | ✅ |
| Approve Expenses | ✅ | ✅ | ❌ |
| User Management | ✅ | ❌ | ❌ |
| Approval Rules | ✅ | ❌ | ❌ |
| View All Expenses | ✅ | Team Only | Own Only |
| System Settings | ✅ | ❌ | ❌ |

---

## 🔑 Key Components

### Authentication System
- **AuthContext**: Global authentication state management
- **AuthService**: Handles login, logout, and token validation
- **LoginPage**: Multi-role login interface

### Expense Management
- **AddExpenseForm**: Create new expense claims with currency conversion
- **ExpenseTable**: Display and manage expenses with filtering
- **ExpenseFilters**: Advanced filtering by status, category, date
- **ReceiptUpload**: Drag-and-drop receipt attachment
- **CurrencyConverter**: Real-time currency conversion

### Approval Workflow
- **ApprovalRules**: Configure multi-level approval hierarchies
- **ApprovalModal**: Review and approve/reject expenses
- **TeamExpensesTable**: Manager view of team expenses

### User Management
- **UserManagement**: CRUD operations for users
- **UserProfile**: User profile and settings
- **EmployeeProfile/ManagerProfile**: Role-specific profiles

### Data Synchronization
- **expenseSync.ts**: Cross-portal expense synchronization
- LocalStorage-based data persistence
- Shared expense format conversion

---

## 🔐 Authentication

The application uses a mock authentication service with the following features:

- **Role-based authentication**: Separate login flows for Admin, Manager, and Employee
- **Token-based sessions**: JWT-style token management
- **Persistent sessions**: LocalStorage-based session persistence
- **Auto-logout**: Invalid token detection and automatic logout

### Authentication Flow

1. User selects role and enters credentials
2. AuthService validates credentials against mock database
3. Token is generated and stored in LocalStorage
4. User is redirected to role-specific dashboard
5. Protected routes check authentication status

---

## 💾 Data Management

### Storage Strategy

The application uses **LocalStorage** for data persistence:

- **User Data**: `currentUser`, `authToken`
- **Expenses**: `sharedExpenses`
- **Settings**: `appSettings`
- **Users**: `users`
- **Approval Rules**: `approvalRules`

### Expense Synchronization

The `expenseSync.ts` utility provides:

- **Cross-portal sync**: Share expenses between Employee, Manager, and Admin portals
- **Format conversion**: Convert between different portal formats
- **Real-time updates**: Instant synchronization across views

### Data Models

#### Expense Interface
```typescript
interface SharedExpense {
  id: string;
  employeeName: string;
  description: string;
  expenseDate: string;
  category: string;
  paidBy: string;
  remarks: string;
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  baseCurrency: string;
  status: 'Draft' | 'Waiting Approval' | 'Approved' | 'Rejected';
  receipt?: string;
  approvalTrail?: Array<{
    action: string;
    user: string;
    comment: string;
    timestamp: string;
  }>;
}
```

#### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  token: string;
}
```

---

## 🎨 UI Components

The application uses **shadcn/ui** components built on **Radix UI** primitives:

### Form Components
- Input, Textarea, Select, Checkbox, Radio Group
- Date Picker, OTP Input, Switch, Slider

### Layout Components
- Card, Accordion, Tabs, Separator
- Resizable Panels, Scroll Area

### Overlay Components
- Dialog, Alert Dialog, Sheet, Drawer
- Popover, Hover Card, Tooltip, Context Menu

### Navigation Components
- Navigation Menu, Menubar, Breadcrumb
- Command Menu (cmdk)

### Feedback Components
- Alert, Badge, Progress, Skeleton
- Toast (Sonner), Avatar

### Data Display
- Table, Chart (Recharts), Carousel

---

## 👨‍💻 Team

### Development Team

This project was developed by the **ODOO x IIT Guwahati** team:

- **Team Name**: Hemathens
- **Project**: Admin Portal - Expense Management System
- **Organization**: ODOO x IIT Guwahati
- **Repository**: hemathens/ODOOxIIT-GN

### Contributors

*Team member details to be added*

---

## 📄 License

This project is licensed under the **MIT License**.

### Third-Party Attributions

- **shadcn/ui**: Used under [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- **Unsplash Photos**: Used under [Unsplash License](https://unsplash.com/license)
- **Radix UI**: Used under MIT License
- **Lucide Icons**: Used under ISC License

---

## 🔧 Configuration

### Vite Configuration

The project uses custom Vite configuration with:

- **React SWC Plugin**: Fast refresh and optimized builds
- **Path Aliases**: `@/` alias for `./src` directory
- **Build Target**: ESNext for modern browsers
- **Dev Server**: Port 3000 with auto-open
- **Output Directory**: `build/`

### Environment Variables

Currently, the application uses mock data and doesn't require environment variables. For production deployment:

- Configure API endpoints
- Set up authentication service URLs
- Add currency conversion API keys

---

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] Export to PDF/Excel
- [ ] Mobile application
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Email notifications
- [ ] Audit trail and logging
- [ ] Advanced search and filters

---

## 📞 Support

For support, questions, or feedback:

- Create an issue in the repository
- Contact the development team
- Refer to the documentation

---

## 🙏 Acknowledgments

- **Figma Design**: Original design from [Admin Dashboard Design](https://www.figma.com/design/CQDEY2eYPEoE1v0AI5X5ey/Admin-Dashboard-Design)
- **shadcn/ui**: For the beautiful component library
- **Radix UI**: For accessible component primitives
- **Vercel**: For Vite and modern tooling

---

<div align="center">

**Built with ❤️ by the Team NeoByte**

*Expense Manager © 2025 – Secure Expense Tracking*

</div>
