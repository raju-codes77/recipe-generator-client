# 🍳 Recipe Generator (Client)

A modern, full-stack AI-driven culinary companion and wellness platform. Recipe Generator helps users discover customized recipes, plan nutritious meals, track wellness and fitness goals, take on health challenges, and connect with a passionate foodie community.

Built with **Next.js 16 (App Router)**, **React 19**, **Better Auth**, and **Tailwind CSS v4**.

🌐 **Live Demo:** [https://food-canvas.vercel.app/](https://food-canvas.vercel.app/)

---

## 🌟 Key Features

- **🤖 AI-Powered Recipe Generation**: Generate tailored recipes from available pantry ingredients, dietary restrictions, and cuisine preferences.
- **📅 Smart Meal Planner**: Plan daily and weekly balanced meal schedules with automated nutrition breakdown.
- **💪 Wellness & Health Tracking**: Log and monitor hydration, calorie intake, workouts, and wellness habits with interactive visualizations.
- **🏆 Interactive Challenges**: Join health and nutrition challenges, track streaks, and earn achievements.
- **👥 Community & Social Feeds**: Share recipes, pin favorite dishes, comment, and engage with culinary enthusiasts.
- **🔐 Secure Authentication**: Multi-provider authentication (Google OAuth, email/password) powered by Better Auth.
- **📱 Responsive & Fluid UI**: Fluid animations powered by Framer Motion and GSAP, optimized across mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Feedback & Markdown**: [React Hot Toast](https://react-hot-toast.com/), [React Markdown](https://github.com/remarkjs/react-markdown)

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── ai-tools/         # AI recipe and culinary utilities
│   ├── challenges/       # Wellness & culinary challenges
│   ├── community/        # Community feed, posts, and messaging
│   ├── dashboard/        # User analytics and wellness management
│   ├── meal-planner/     # Weekly and daily meal scheduling
│   ├── recipes/          # Recipe exploration and details
│   └── wellness/         # Health habits and activity tracking
├── components/           # Reusable UI components (Navbar, Footer, Banners, Cards)
├── hooks/                # Custom React hooks
├── lib/                  # Auth clients, API utilities, and helper functions
└── types/                # TypeScript type definitions and interfaces
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.17.0 or later recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/raju-codes77/recipe-generator-client.git
   cd recipe-generator-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and configure the necessary variables (API URLs, Auth secrets, etc.):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and builds the production application bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality and style issues |

---

## 👥 Contributors

- **Yajuddin Raju** - [https://github.com/raju-codes77](https://github.com/raju-codes77)
- **Fahid Hasan** - [https://github.com/fahid2002](https://github.com/fahid2002)
- **Lam272** - [https://github.com/Lam272](https://github.com/Lam272)
- **kawserali-64** - [https://github.com/kawserali-64](https://github.com/kawserali-64)
- **toufikhossain11** - [https://github.com/toufikhossain11](https://github.com/toufikhossain11)
- **Nayem Ahmed** - [https://github.com/nayemk0087](https://github.com/nayemk0087)
