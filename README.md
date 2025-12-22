## CityFix – Public Infrastructure Issue Reporting Portal

CityFix is a modern, responsive citizen engagement platform for reporting, tracking, and resolving public infrastructure issues in a city.

- **Live Client URL**: `https://cityfix-c2383.web.app/`
- **Admin Email**: `admin@cityfix.com`
- **Admin Password**: `admin@123`

---

## Core Concept

CityFix is a **Public Infrastructure Issue Reporting System** where citizens can:

- Report issues such as roads, water, electricity, garbage, and environmental problems.
- Track the progress of each issue from *pending* to *resolved* through a visual timeline.
- Upvote important issues so that city staff and administrators can prioritize them.
- Optionally boost issues to *high priority* through online payments and become premium users.

City staff and administrators manage, assign, and resolve these issues from dedicated role-based dashboards.

---

## Key Features

- **Public Infrastructure Issue Reporting**
  - Citizens can submit detailed issue reports with title, description, category, priority, location, and image upload.
  - Issues flow through statuses such as *pending*, *in‑progress*, *resolved*, and *closed*, with full timeline tracking.

- **Responsive, Modern UI**
  - Fully responsive layout optimized for **mobile**, **tablet**, and **desktop**.
  - Theme support with light/dark mode and polished UX built using Tailwind CSS and DaisyUI.

- **Authentication & Persistent Sessions**
  - Email/password and Google-based authentication using Firebase.
  - Protected/private routes for dashboards (Citizen, Staff, Admin) that remain logged in after refresh via Firebase `onAuthStateChanged`.

- **Rich Home Page Experience**
  - Structured landing page with:
    - Sticky navbar and scroll-to-top.
    - Hero/banner section with call-to-action.
    - Highlighted **Latest Resolved Issues**.
    - **Features** section describing core capabilities.
    - **How It Works** step-by-step process for citizens and staff.
    - Additional extra content sections for trust and engagement.
    - Global footer with navigation and branding.

- **All Issues Directory with Rich Cards**
  - Dedicated **All Issues** page listing issues as responsive cards.
  - Each card shows **image**, **title**, **category**, **status badge**, **priority badge**, **location**, **short description**, and assigned staff.
  - Includes a clear **View Details** button that opens the full issue details view.

- **Server-side Search, Filter, Sort & Pagination**
  - **Search** by title, category, or location.
  - **Filter** by category, status, and priority (normal/medium/high).
  - Requests are made with query parameters to the backend for **server-side search and filtering**.
  - **Pagination** with page indicator and prev/next controls to efficiently browse large datasets.

- **Issue Details with Ownership Controls**
  - Issue details page shows full description, reporter information, assigned staff, badges, and upvote count.
  - Citizens can **upvote** an issue to signal importance (see restrictions below).
  - If the logged-in user **owns** the issue and its status is **pending**, they can **edit**, **delete**, or **boost** the issue.
  - Admin and staff can update the issue status from the details view.

- **Payment Flow & Stripe Integration**
  - Integrated payment confirmation flow using **Stripe Checkout** on the backend.
  - Citizens can upgrade to premium or **boost issue priority** via payments.
  - Successful Stripe payments are verified via session ID, recorded on the server, and summarized in admin payment analytics.

- **Free vs Premium Users**
  - Default new users are **free citizens**.
  - After a successful Stripe payment, users are upgraded to **premium** and flagged in their profile.
  - The navbar and dashboards visually distinguish *Premium Citizen* vs *Citizen* roles.

- **Upvote Logic & Restrictions**
  - Authenticated citizens can upvote issues they do not own.
  - Each user can upvote a specific issue **only once**; repeat attempts are blocked with a contextual notification.
  - Issue cards and the details page display the current total upvote count.

- **Role-based Dashboards**
  - **Citizen Dashboard**: report new issues, view personal issues, manage profile, and track premium status.
  - **Staff Dashboard**: view assigned issues, update progress/status, and manage profile.
  - **Admin Dashboard**: monitor global statistics (issues by status, citizen/staff counts), manage issues, users, staff, and payments.

- **Timeline Tracking UI**
  - Each issue includes a chronological **timeline** of status changes and staff/admin actions.
  - Timeline entries display status, message, actor, and timestamp, rendered as a vertical progress trail.

- **Notifications & Feedback**
  - Uses **SweetAlert2** for rich modal notifications (success, error, warning, confirmation prompts).
  - Toast-style feedback appears for key flows such as login, issue submission, upvote attempts, and payment verification.

---

## Tech Stack

- **Frontend Framework**: React (Vite)
- **Routing**: React Router DOM
- **State & Data Fetching**: React hooks, Axios  
  > Note: The backend is built to be compatible with **TanStack Query**, and the system is conceptually designed so that **all fetching can be handled by TanStack Query** for caching, refetching, and synchronization in a production setup.
- **Styling**: Tailwind CSS, DaisyUI, custom CSS
- **Animations**: Framer Motion, AOS
- **Authentication**: Firebase Authentication (email/password, Google)
- **Role & Auth Management**: Custom hooks (`useAuth`, `useRole`) and route guards (`AdminRoute`, `StaffRoute`, `AuthRedirect`)
- **Forms**: React Hook Form (where applicable)
- **Icons & Charts**: React Icons, Lucide React, Recharts
- **Notifications**: SweetAlert2
- **Payments**: Stripe Checkout (via backend APIs)
- **Build Tooling**: Vite, ESLint, PostCSS, Tailwind CLI

---

## Project Structure (Frontend)

High-level structure:

- `src/main.jsx` – React entry file, wraps the app with `ThemeProvider`, `AuthProvider`, and `RouterProvider`.
- `src/routes/router.jsx` – Route definitions for public pages and dashboards (Citizen, Staff, Admin).
- `src/layouts/*` – Layout components (`MainLayout`, `DashboardLayout`, `AdminLayout`, `StaffLayout`) with shared navigation, footer, and loaders.
- `src/provider/AuthProvider.jsx` – Firebase auth integration and user/role context.
- `src/provider/ThemeContext.jsx` – Light/dark theme handling.
- `src/hooks/useAuth.js`, `src/hooks/useRole.js` – Authentication and role-based convenience hooks.
- `src/pages/Home/*` – Home page implementation with hero, latest resolved issues, features, how-it-works, extra sections.
- `src/pages/AllIssues/AllIssues.jsx` – All issues listing with search, filtering, and pagination.
- `src/pages/IssueDetails/IssueDetails.jsx` – Single issue view with upvotes, boost, edit/delete, status management, and timeline.
- `src/pages/UserDashboard/*` – Citizen dashboard pages (reporting, listing personal issues, profile, etc.).
- `src/pages/Admin/*` – Admin dashboard, user/staff/issue management, and payments analytics.
- `src/pages/Staff/*` – Staff dashboard and assigned issues management.
- `src/components/Navbar`, `Footer`, `Hero`, `LatestResolved`, `Features`, `HowItWorks`, `Extras`, etc. – Reusable UI components across the site.

---

## Environment Configuration

The frontend expects a running backend API and several environment variables. Create a `.env` (or `.env.local`) in the project root with values similar to:

```bash
VITE_API_BASE=https://your-api-base-url.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Ensure these match the configuration used by your backend and Firebase project.

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** or **yarn** (examples use npm)

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>.git
cd CityFix-Client
npm install
```

Configure environment variables as described in the **Environment Configuration** section.

### Running the Development Server

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

### Building for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist` directory. You can preview it locally using:

```bash
npm run preview
```

---

## Authentication, Roles & Access Control

- **Citizens (Free Users)**
  - Sign up with email/password or Google.
  - Can report issues, view public issues, upvote others’ issues once, and track their own issues.

- **Premium Citizens**
  - Upgraded via **Stripe-powered payments**.
  - Visually highlighted in the UI (e.g., *Premium Citizen* badge).
  - Enjoy enhanced prioritization of their boosted issues.

- **Staff**
  - Access staff dashboard to view **assigned issues**, update statuses, and add timeline updates.

- **Admins**
  - Full access to admin dashboard, including statistics, user and staff management, payments overview, and issue-level controls.

- **Private Routes & Persistence**
  - Role-based route guards ensure only authorized roles can access corresponding dashboards.
  - Authentication state persists across page refreshes via Firebase session handling.

---

## Issues, Upvotes, Boosting & Timeline

- **Issue Lifecycle**
  - Reported by citizens with structured data and optional images.
  - Admin assigns issues to staff; status changes are recorded in the **timeline**.
  - Citizens and all visitors can see the progress in the issue details page.

- **Upvotes**
  - Authenticated users can upvote any issue **once**, except their own.
  - Attempting to upvote twice or upvote own issues triggers informative toast/modals.

- **Boosting & Payments**
  - Citizens can **boost** an issue’s priority to *high* using payment.
  - Payment is processed via **Stripe Checkout**, and the backend confirms and stores payment records.
  - Admins can view a detailed list of payments and overall revenue/premium-user metrics on the **Payments** page.

- **Timeline Tracking UI**
  - Each status change (e.g., *pending → in‑progress → resolved*) is logged with:
    - Status
    - Message/description
    - Actor (admin/staff)
    - Timestamp
  - Displayed as a vertical timeline on the issue details page for full transparency.

---

## Searching, Filtering & Pagination

- **All Issues Page**
  - Search bar for free-text search against title, category, and location.
  - Dropdown filters for:
    - Category (road, water, electrical, garbage, environment, etc.)
    - Status (pending, in‑progress, resolved)
    - Priority (normal, medium, high)
  - **Server-side search and filtering**: parameters are passed through query strings to the backend API.
  - **Pagination**:
    - Fixed page size for consistent UX.
    - Prev/Next controls and page indicator.

These patterns are designed to integrate cleanly with **TanStack Query** for more advanced caching and refetching if desired.

---

## Notifications & UX

- **SweetAlert2 Modals**
  - Used for confirmations (submit issue, delete issue, boost priority, payments).
  - Success, error, warning, and info states for high-clarity feedback.

- **Toasts & Inline Feedback**
  - Used for events such as invalid upvotes, failed API calls, and payment verification failures.
  - Ensures users understand the state of their actions at all times.

---

## Screenshots (Placeholders)

You can replace the placeholders below with real screenshots from your deployment:

- `./screenshots/home.png` – Home page (hero, latest resolved issues, features).
- `./screenshots/all-issues.png` – All Issues listing with filters and pagination.
- `./screenshots/issue-details.png` – Issue details with upvotes, boost, and timeline.
- `./screenshots/citizen-dashboard.png` – Citizen dashboard (my issues, report issue).
- `./screenshots/staff-dashboard.png` – Staff dashboard (assigned issues).
- `./screenshots/admin-dashboard.png` – Admin dashboard and payments overview.

---

## License

This project is intended for academic and demonstration purposes as part of a course assignment. Adapt or extend it according to your institutional or organizational requirements.


