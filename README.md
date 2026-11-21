# SaaS Analytics Platform

An analytics dashboard for SaaS businesses, enhanced with Supabase authentication and an AI-powered project assistant.

Originally developed by [AysoDev](https://github.com/AysoDev/saas-analytics). This repository contains additional improvements made as part of an academic project.

## Project Overview

The SaaS Analytics Platform provides a dashboard for understanding key business metrics, including revenue, customer activity, churn, and retention.

The project was enhanced with secure user authentication and an AI chatbot that answers questions about the platform and its features.

## Target Audience

- SaaS founders and business owners
- Product managers
- Business analysts
- Students learning about SaaS analytics

## Features

### Existing Dashboard
- Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR) metrics
- Customer analytics
- Churn and retention metrics
- Revenue charts and visualizations
- Light and dark themes

### Implemented Improvements

**1. Supabase Authentication**
- Email and password login
- Protected dashboard routes
- Session management
- Password reset functionality
- Password update functionality
- Logout functionality

**2. AI-Powered Project Assistant**
- Interactive chatbot integrated into the dashboard
- Uses the Groq API with the `openai/gpt-oss-120b` model
- Answers questions about the project and its features
- Uses project-specific knowledge to provide relevant responses
- Handles authentication and API errors

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Chart.js | Data visualization |
| Supabase | Authentication and session management |
| Groq API | AI chatbot responses |
| Git and GitHub | Version control |

## Project Structure

```text
saas-analytics/
├── .github/
├── saas-analytics/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/chat/
│   │   │   ├── auth/callback/
│   │   │   ├── dashboard/
│   │   │   └── update-password/
│   │   ├── components/
│   │   ├── lib/
│   │   │   ├── knowledge/
│   │   │   └── supabase/
│   │   └── middleware.ts
│   ├── .env.example
│   └── package.json
├── README.md
├── SUPABASE_AUTH_SETUP.md
└── LICENSE
```

## Getting Started

### Prerequisites

- Node.js
- Git
- pnpm (Corepack can be used to run pnpm)
- A Supabase project
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/AysoDev/saas-analytics.git
cd saas-analytics/saas-analytics
```

### 2. Install dependencies

```bash
corepack pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file inside the inner `saas-analytics` application directory.

Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=openai/gpt-oss-120b