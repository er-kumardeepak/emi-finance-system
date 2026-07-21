# 💳 CrediFlow Finance Suite

CrediFlow Finance Suite is an enterprise-grade, end-to-end EMI (Equated Monthly Installment) management and financial operations platform. Built using **React (Vite)** on the frontend and **Node.js (Express) & MongoDB** on the backend, it provides retail finance teams, product lenders, and installment collection agencies with a unified workspace to manage KYC, loans, EMI schedules, collections, and operational reporting.

---

## 🏗️ System Architecture & Stack

The project is structured as a decoupled monorepo with distinct frontend and backend services:

### 💻 Frontend ([SF-Frontend-main](file:///d:/Emi-Finance_system/SF-Frontend-main/SF-Frontend-main))
A high-performance Single Page Application (SPA) designed with a clean, responsive layout supporting dark and light modes.
* **Core:** React 18, Vite, React Router DOM (v6)
* **Styling:** Tailwind CSS, React Icons
* **Data Visualization:** Recharts (KPIs, collection trends, performance charts)
* **Features:** Client-side document export (jsPDF & html2canvas for PDF receipts)

### ⚙️ Backend ([SF-Backend-main](file:///d:/Emi-Finance_system/SF-Backend-main/SF-Backend-main))
A secure, scalable RESTful API that handles business logic, schedule generation, and role-based actions.
* **Core:** Node.js, Express.js, MongoDB, Mongoose ODM
* **Security:** JSON Web Tokens (JWT) for authentication, bcryptjs for password hashing, CORS middleware
* **Configuration:** Dotenv-based environment management

---

## 🌟 Key Features

* **🔐 Role-Based Access Control (RBAC):** Authenticated dashboards with custom privileges for `admin` (management, staff registration, system overrides) and `staff` (loans, customer onboarding, payment collections).
* **👤 KYC & Customer Management:** Secure onboarding flow with address tracking, KYC document reference storage, and auto-generated customer display IDs.
* **📈 Loan & EMI Engine:** Automated installment amortization scheduler calculating down payments, processing fees, and monthly dues over customizable loan durations (e.g., 3, 6, 9, 12 months).
* **💰 Real-Time Payment Collection:** Instantly record collections, update installment statuses, track overdue accounts, and print digital receipts on the fly.
* **📊 Business Reports:** Multi-dimensional reports detailing collection history, agent performance metrics, loan status distributions, and aging overdue accounts.

---

## 📂 Project Directory Structure

```text
emi-finance-system/
├── SF-Frontend-main/
│   └── SF-Frontend-main/          # React App source, configs, assets
│       ├── src/
│       │   ├── components/        # Reusable UI components & layouts
│       │   ├── context/           # Theme, Authentication, and Session providers
│       │   ├── pages/             # App views (Dashboard, Customers, Loans, Payments, Reports)
│       │   ├── services/api/      # Axios HTTP client configuration and API methods
│       │   └── utils/             # Formatters, date math, and helper tools
│       ├── index.html
│       ├── tailwind.config.js
│       └── package.json
│
├── SF-Backend-main/
│   └── SF-Backend-main/           # Express API source, models, controllers
│       ├── config/                # Database connection utilities
│       ├── controllers/           # Route handler controllers (Auth, Customer, Loan, EMI)
│       ├── middleware/            # JWT verification & Error handlers
│       ├── models/                # Mongoose Database Schemas (User, Customer, Loan, EMI)
│       ├── routes/                # REST endpoints
│       └── package.json
│
├── DEPLOYMENT.md                  # Comprehensive deployment runbook
├── render.yaml                    # Render blueprint for backend web service
├── package.json                   # Root package definitions containing dev scripts
└── README.md                      # Workspace-level documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v16.0.0 or higher recommended)
* **npm** (v8.0.0 or higher)
* **MongoDB** (local community server instance or a MongoDB Atlas URI)

---

### Setup & Installation

1. **Clone the repository** and navigate to the project directory:
   ```bash
   cd emi-finance-system
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd SF-Frontend-main/SF-Frontend-main
   npm install
   cd ../..
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd SF-Backend-main/SF-Backend-main
   npm install
   cd ../..
   ```

---

### Environment Configuration

Configure environment variables by copying the example files:

#### 1. Backend Config
Navigate to `SF-Backend-main/SF-Backend-main`, copy `.env.example` to `.env`, and fill in the values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crediflow-backend  # Or MongoDB Atlas connection string
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

#### 2. Frontend Config
Navigate to `SF-Frontend-main/SF-Frontend-main`, copy `.env.example` to `.env`, and adjust the API URL if needed:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### Running the Services Locally

We provide helper scripts at the workspace root (`package.json`) to control both applications without nested directory traversal:

* **Start Frontend Dev Server:**
  ```bash
  npm run dev
  ```
  *(Launches the frontend at `http://localhost:5173`)*

* **Start Backend Dev Server:**
  ```bash
  npm run dev:backend
  ```
  *(Launches the Express API at `http://localhost:5000`)*

---

## 🔗 Main API Endpoints

| Resource | Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Authentication** | `POST` | `/api/auth/login` | Public | Authenticates credentials and returns a JWT token |
| | `POST` | `/api/auth/register-staff` | Admin Only | Registers a new staff member |
| | `GET` | `/api/auth/me` | Authenticated | Retrieves current user session data |
| **Customers** | `POST` | `/api/customers` | Authenticated | Adds a new customer to the database |
| | `GET` | `/api/customers` | Authenticated | Retrieves list of customers (supports search) |
| | `GET` | `/api/customers/:id` | Authenticated | Fetches a specific customer profile |
| | `DELETE`| `/api/customers/:id` | Admin Only | Removes a customer profile |
| **Loans** | `POST` | `/api/loans` | Authenticated | Books a loan and generates the EMI schedule |
| | `GET` | `/api/loans` | Authenticated | Lists loans (filterable by customer or product) |
| | `GET` | `/api/loans/:id` | Authenticated | Retrieves detailed loan data with status |
| **EMIs** | `GET` | `/api/emis/:loanId` | Authenticated | Returns the amortization schedule for a loan |

---

## 🌐 Deployment Overview

Refer to [DEPLOYMENT.md](file:///d:/Emi-Finance_system/DEPLOYMENT.md) for step-by-step deployment instructions.

* **Frontend:** Hosted on **Vercel** pointing to the root directory `SF-Frontend-main/SF-Frontend-main`, configured with `npm run build` as the build command and `dist` as the output directory.
* **Backend:** Hosted on **Render** (via `render.yaml` blueprint or manual setup) utilizing Node environment, root directory `SF-Backend-main/SF-Backend-main`, and standard web service settings.
