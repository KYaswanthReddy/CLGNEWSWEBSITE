# 🎓 College News & Campus Management System

A comprehensive, full-stack campus management and news portal designed for RGUKT Ongole. This platform centralizes college news, sports updates, club activities, student achievements, and features an intelligent AI chatbot to assist students with campus-related queries.

---

## 🚀 Key Features

### 🔐 Advanced Authentication
- **Secure Access**: JWT-based authentication for students and administrators.
- **Profile Management**: Student registration and profile tracking.
- **Robust Password Reset**: Fail-safe reset flow with SMTP timeout handling and a development bypass mode for restricted network environments (e.g., Render free tier).

### 🏆 Sports & Athletic Excellence
- **Dynamic Categories**: Manage various sports like Cricket, Basketball, Volleyball, etc.
- **Match Records**: Centralized tracking of match schedules, team details, and results.
- **Image Fallbacks**: Robust image pipeline with automatic placeholders and error handlers to ensure a premium UI even during server cold starts.

### 🤝 Clubs & Campus Life
- **Club Management**: Dedicated portals for technical, cultural, and creative clubs.
- **Event Tracking**: Real-time updates on upcoming club events and activities.
- **Achievement Records**: "Wall of Trophies" to showcase club milestones.

### 🌟 Achievement Portal
- **Athletic Excellence**: Highlighting top-performing athletes and teams.
- **Student Spotlights**: Showcasing academic and extracurricular accomplishments.

### 🤖 Intelligent Campus Chatbot
- **Intent-Aware**: Specialized in answering campus-specific queries (exams, schedules, achievements).
- **Multi-LLM Support**: Powered by OpenAI and Google Gemini for accurate, context-aware responses.
- **Granular Filtering**: Smart response logic for branch/year-specific data.

### 🛠️ Admin Dashboard
- **Unified Controls**: Comprehensive CRUD operations for all site content.
- **Media Management**: Image upload system with preview support and storage optimization.
- **Branding Controls**: Dynamic management of college logos, social links, and branding assets.

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Security**: JWT (JSON Web Tokens), bcryptjs, Helmet
- **File Uploads**: Multer
- **Email**: Nodemailer, Resend API

### AI Services
- **LLMs**: OpenAI GPT-4o / Google Gemini 1.5 Pro
- **Integration**: OpenAI SDK, Google Generative AI SDK

---

## 📂 Project Structure

```text
CLGNEWS/
├── frontend/               # React Client
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Card, etc.)
│   │   ├── pages/          # Main views (Home, Sports, Admin, Auth)
│   │   ├── context/        # State Management (AuthContext)
│   │   ├── services/       # API integration layers
│   │   ├── utils/          # Formatting and image helpers
│   │   └── assets/         # Static images and styles
│   └── public/             # Static public assets
│
└── backend/                # Node.js Server
    ├── controllers/        # Business logic for routes
    ├── models/             # Mongoose schemas (User, Event, Sport, etc.)
    ├── routes/             # Express API endpoints
    ├── middleware/         # Auth, Error, and Upload middle-wares
    ├── utils/              # Email services and token generators
    ├── config/             # DB and Environment config
    └── uploads/            # Local storage for images (if used)
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the `backend/` directory with the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_app_password
OPENAI_API_KEY=your_openai_key
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KYaswanthReddy/CLGNEWSWEBSITE.git
   cd CLGNEWS
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🌐 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com/)
- **Backend**: Hosted on [Render](https://render.com/)

> [!NOTE]
> The backend uses specific optimizations for Render's free tier, including auto-retry logic for cold starts and SMTP bypass fail-safes for restricted network ports.

---

## 📄 License
This project is for internal use at RGUKT Ongole. All rights reserved.
