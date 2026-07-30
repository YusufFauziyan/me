# Ngantry - Frontend Application

A modern, responsive, and easy-to-use digital queue management system designed for various business needs. It allows customers to take queue tickets independently, monitor queues in real-time, and assists admins in managing queue flows from an interactive dashboard.

## 📸 Preview Landing Page

![Landing Page](./src/assets/landing-page.png)

---

## ✨ Key Features

* **Modern & Interactive Landing Page**: Equipped with real-time queue statistics and queue flow guidance.
* **Admin Dashboard**: Manage queue numbers, company/counter settings, and queue history.
* **Real-time Queue Display (TV Page)**: Dedicated waiting room TV layout with a voice announcement system.
* **WhatsApp & Email Integration**: Automated notifications to customer WhatsApp and customizable email notification templates.
* **Security**: Role-based route protection (Admin/Superadmin) and Google OAuth integration.
* **Multi-Company Support**: Centralized management for multiple companies/branches (Superadmin).

## 🛠️ Tech Stack

* **Frontend Framework**: React 19
* **Build Tool**: Vite
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 & Framer Motion (for smooth transitions)
* **UI Components**: Radix UI (Dialog, Switch, Separator, etc.) & Lucide React (Icons)
* **Routing**: React Router v7
* **Form Handling**: React Hook Form & Zod (for schema validation)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (version 18+) and **npm** installed on your local machine.

### 2. Install Dependencies
Run the following command to install the required packages:
```bash
npm install
```

### 3. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Open the `.env` file and configure the variables:
* `VITE_API_BASE_URL`: Backend API endpoint (default: `http://localhost:8080/api/v1`)
* `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID for authentication

### 4. Run Development Server
To start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 5. Build for Production
To compile the application for production:
```bash
npm run build
```
The compiled files will be saved in the `dist/` directory.

### 6. Preview Production Build
To test the production build locally:
```bash
npm run preview
```
The application will run on the preview port (typically `http://localhost:4173` or `http://localhost:5173`).
