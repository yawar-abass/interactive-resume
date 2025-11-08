# Interactive Resume – Next.js + TypeScript + Tailwind CSS

An **Interactive Resume Web Application** built using **Next.js, TypeScript, Tailwind CSS, and shadcn/ui**, featuring multiple interactive elements like skill-based filtering, view toggles (Cards/Table/Timeline), and dynamic search.  
This project fulfills the **Frontend Assignment Requirements** for Algokart.

---

## Features

### Core Functionality

- **Skill / Tech Filter:**  
  Filter experiences and projects by one or multiple skills with `AND` / `OR` mode.
- **Search Bar:**  
  Search by role, company, project name, or tech stack instantly.
- **Switch Views:**  
  Toggle between **Cards**, **Table**, and **Timeline** views dynamically.
- **Work Experience & Projects:**  
  Separate sections with shared search and filter logic.
- **Education, Certifications & Awards:**  
  Additional resume sections for a complete professional profile.

### UI & UX Enhancements

- **Modern glassmorphic interface** using Tailwind CSS and shadcn/ui.
- **Responsive design** – works seamlessly across devices.
- **Gradient background effects** with subtle animations.
- **Print / Download PDF** functionality using `react-pdf`.
- **Login authentication** (mock) for gated access to the resume page.

---

## Tech Stack

| Category                  | Tools                                                |
| ------------------------- | ---------------------------------------------------- |
| **Frontend Framework**    | [Next.js](https://nextjs.org/)                       |
| **Language**              | TypeScript                                           |
| **Styling**               | [Tailwind CSS](https://tailwindcss.com/)             |
| **UI Library**            | [shadcn/ui](https://ui.shadcn.com/)                  |
| **PDF Export**            | [react-pdf](https://www.npmjs.com/package/react-pdf) |
| **Authentication (Mock)** | LocalStorage-based login                             |
| **Icons / Components**    | Lucide + shadcn components                           |

---

## Project Structure

```bash
.
├── app/
│   ├── login/                # Login page
│   └── resume/               # Main resume page
│       └── page.tsx
├── components/
│   ├── layout/               # Footer, Header components
│   ├── resume/               # Resume-specific components
│   │   ├── ResumeFilters.tsx
│   │   ├── ResumeViewToggle.tsx
│   │   ├── ResumeCardList.tsx
│   │   ├── ResumeTimeline.tsx
│   │   ├── ResumeTable.tsx
│   │   ├── ResumeEducation.tsx
│   │   ├── ResumeCertifications.tsx
│   │   ├── ResumeAwards.tsx
│   │   ├── ResumeSummary.tsx
│   │   └── ResumeDownloadButton.tsx
│   └── ui/                   # shadcn components (Button, Input, Card, etc.)
├── data/
│   └── resume.json           # Resume data (experience, projects, etc.)
├── lib/
│   ├── auth.ts               # Login/Logout utilities
│   └── types.ts              # TypeScript type definitions
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yawar-abass/interactive-resume.git
cd interactive-resume

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev


Open your browser and visit:
👉 http://localhost:3000

🔐 Login Credentials

For demo/testing purposes:

Email: test@algokart.com
Password: pass123


(Uses localStorage to simulate authentication.)
```
