import 'server-only'

/**
 * Verified project context for the Project Information Assistant.
 * Keep implementation claims tied to the referenced source files. Descriptions
 * marked as inferences are based on the UI and are not formal product claims.
 */
export const projectKnowledge = {
  project: {
    purpose: {
      verified: 'The application presents a SaaS analytics dashboard for viewing revenue and customer information. The UI describes an analytics dashboard, a customer account management page, and revenue performance tracking.',
      sources: [
        'src/components/pages/Dashboard/Main.tsx',
        'src/components/pages/Customers/Main.tsx',
        'src/components/pages/revenue/Main.tsx',
      ],
    },
    audience: {
      verified: 'The login page is titled Admin Portal and the customer page says Manage your customer accounts.',
      inference: 'The interface appears intended for dashboard administrators or SaaS operators. The repository does not define formal personas or customer research.',
      sources: ['src/components/pages/Login/Main.tsx', 'src/components/pages/Customers/Main.tsx'],
    },
    features: [
      {
        name: 'Dashboard overview',
        details: 'Shows total revenue, new users, conversion rate, a performance chart, and a recent activity list.',
        sources: ['src/components/pages/Dashboard/Main.tsx', 'src/components/pages/Dashboard/Metrics.tsx'],
      },
      {
        name: 'Customer management view',
        details: 'Shows customer summary cards, search by name/email/company, status and plan filters, a paginated table, and a customer details/edit modal.',
        sources: ['src/components/pages/Customers/Main.tsx', 'src/components/pages/CustomerFilter/Main.tsx', 'src/components/pages/CustomerTable/Main.tsx'],
      },
      {
        name: 'Revenue analysis view',
        details: 'Shows revenue KPIs, a chart, monthly breakdown, and plan performance, with date, metric, and plan controls.',
        sources: ['src/components/pages/revenue/Main.tsx', 'src/components/pages/RevenueChart/Main.tsx', 'src/components/pages/RevenueMetrics/Main.tsx'],
      },
      {
        name: 'Authentication',
        details: 'Email/password login, password recovery, password update, session refresh, protected dashboard routes, and logout use Supabase Auth.',
        sources: ['src/components/pages/Login/Main.tsx', 'src/components/pages/FPassword/Main.tsx', 'src/app/update-password/page.tsx', 'src/middleware.ts', 'src/app/dashboard/layout.tsx', 'src/components/pages/Sidenav/Main.tsx'],
      },
      {
        name: 'Dashboard shell',
        details: 'Provides sidebar navigation, a theme toggle, and shared dashboard header and layout.',
        sources: ['src/app/dashboard/LayoutWrapper.tsx', 'src/components/pages/Sidenav/Main.tsx', 'src/components/pages/Header/Main.tsx'],
      },
    ],
  },
  technology: [
    { name: 'Next.js 15.5.0', role: 'App Router routes, server-rendered layouts, middleware, and route handlers.' },
    { name: 'React 19.1.0', role: 'Interactive client components and UI state.' },
    { name: 'TypeScript 5', role: 'Types for application components and data.' },
    { name: 'Chart.js 4.5.0', role: 'Dashboard and revenue visualizations.' },
    { name: 'Supabase Auth with @supabase/ssr and @supabase/supabase-js', role: 'Email/password authentication and cookie-backed browser/server sessions.' },
    { name: 'Tailwind CSS 4 and component CSS', role: 'Styling infrastructure; most page/widget styling is in colocated CSS files.' },
    { name: 'Lucide React', role: 'Interface icons.' },
    { name: 'Groq API', role: 'The Project Information Assistant calls Groq Chat Completions from a server-side Next.js route handler using its OpenAI-compatible REST API.' },
  ],
  architecture: {
    verified: 'App routes are in src/app. Page-level components and widgets are organized under src/components. Supabase browser and server clients live under src/lib/supabase. The assistant UI is mounted in the dashboard shell and calls an authenticated route handler at src/app/api/chat/route.ts. Its project context is maintained in this server-only file.',
    sources: ['src/app', 'src/components', 'src/lib/supabase', 'src/app/dashboard/LayoutWrapper.tsx', 'src/app/api/chat/route.ts', 'src/lib/knowledge/project.ts'],
  },
  authentication: {
    verified: 'Login calls Supabase signInWithPassword in the browser. @supabase/ssr stores sessions in cookies. src/middleware.ts refreshes sessions and redirects unauthenticated dashboard requests; src/app/dashboard/layout.tsx independently checks claims server-side. Logout calls signOut. Password recovery calls resetPasswordForEmail, exchanges the PKCE code in /auth/callback, then calls updateUser on /update-password.',
    sources: ['src/lib/supabase/client.ts', 'src/lib/supabase/server.ts', 'src/components/pages/Login/Main.tsx', 'src/components/pages/FPassword/Main.tsx', 'src/middleware.ts', 'src/app/dashboard/layout.tsx', 'src/app/auth/callback/route.ts', 'src/app/update-password/page.tsx', 'src/components/pages/Sidenav/Main.tsx'],
  },
  assistant: {
    verified: 'The Project Information Assistant provides one chat interface for project questions and general SaaS analytics questions. The browser sends the conversation to an authenticated Next.js route handler. The route includes this knowledge base in system instructions and calls Groq Chat Completions using GROQ_API_KEY only on the server.',
    sources: ['src/components/widgets/ProjectAssistant/Main.tsx', 'src/app/api/chat/route.ts', 'src/lib/knowledge/project.ts'],
  },
  sampleMetrics: {
    dashboard: 'The current sample dashboard metrics are total revenue $124,563, 2,453 new users, and a 12.4% conversion rate. The values and reported change percentages are hardcoded sample data, not live analytics.',
    revenue: 'Revenue page sample values include $124,563 total revenue, $115,000 recurring revenue, $9,563 one-time revenue, 12.5% growth, 2.3% churn, $89.45 ARPU, and $2,675 LTV. Monthly and plan values are also hardcoded.',
    customers: 'The customer page returns a fixed list of 13 sample customers. Filtering and pagination run in the browser. The date range controls are present but are not applied by the current filter logic. Customer edit/delete is not persisted to a backend.',
    limitations: 'No database schema or application data queries are present. Supabase is used for authentication; dashboard and customer analytics are not connected to Supabase tables or another data backend. Revenue filter controls reload the same sample dataset. Export and Add Customer controls are UI only.',
    sources: ['src/components/pages/Dashboard/Main.tsx', 'src/components/pages/Dashboard/Metrics.tsx', 'src/components/pages/revenue/Main.tsx', 'src/components/pages/Customers/Main.tsx', 'src/components/pages/CustomerTable/Main.tsx'],
  },
} as const

export function formatProjectKnowledge() {
  return JSON.stringify(projectKnowledge, null, 2)
}
