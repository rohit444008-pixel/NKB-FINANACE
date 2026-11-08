# NKB Finance

NKB Finance is a Next.js App Router starter for a small microfinance and loan operation. It includes a responsive operations dashboard, customer and loan views, collections, cash-book, exports, QR scanning, a local offline collection queue, and a Supabase/Postgres schema with role-scoped RLS policies.

## Run locally

1. Install Node.js 20.9 or newer.
2. Run `npm install`, then `npm run dev`.
3. Open `http://localhost:3000`.

## Android APK

Android Studio and the Android SDK are required. Run `npm run build:android` to export the web app and sync the Capacitor Android project, then build the debug APK with `android/gradlew.bat assembleDebug`. The generated APK is `android/app/build/outputs/apk/debug/app-debug.apk`; a copy is placed at `outputs/NKB-Finance.apk`. This debug APK uses demo mode until Supabase keys are configured in `.env.local` before building.

The dashboard runs with sample data when Supabase environment variables are absent. Add `.env.local` from `.env.example` to connect a Supabase project. Apply the migrations in order in the Supabase SQL Editor: `20261106000100_nkb_finance_core.sql`, then `20261108000100_employee_attendance_work_logs.sql`. Create an organization and assign authenticated users a row in `organization_members` before allowing access to business data. Never put a Supabase secret or service-role key in a `NEXT_PUBLIC_` variable.

## Included workflows

- Dashboard overview, portfolio metrics, repayments, agent leaderboard, cash-book, audit feed and Excel/PDF downloads.
- Add a customer, prepare a loan application, record a collection, add an expense and calculate an EMI.
- Four staff entry points: Super Admin, Manager, Collection Executive and Account Admin. With Supabase enabled, the selected role is a label and the active `organization_members.role` plus database RLS decide access; demo role switching is only a preview.
- Customer intake captures contact, address, Aadhaar last four digits, masked PAN and optional guarantor details. Every new registration enters the manager queue as Pending review; managers can approve, request corrections with a note, or reject it. Loan applications are restricted to approved customers in both the UI and database policy.
- Camera QR reading with `html5-qrcode`; GPS is requested when a collection is saved.
- Collection drafts persist in IndexedDB and the app attempts to sync them when the browser is online and the signed-in user has an organization membership.
- Employees can check in/out and add daily work logs. Attendance punches can be queued locally while offline and synced when connectivity returns; optional GPS is captured only at punch time, not continuously.
- Web app manifest, installable service worker shell, and offline fallback page.
- Supabase email/password sign-in. With a configured project and an active organization membership, customer, loan, collection, and expense records load from Supabase; the schema applies organization and role scoped RLS and audits customer review changes.
- A Postgres schema for organizations, staff roles, borrower KYC metadata, guarantors, loans, collections, cash sessions, expenses and audit logs.

## Before handling live financial data

The screens show sample records until a signed-in user has an organization membership. The no-Supabase login is a demo preview and does not authenticate staff. Before using this for actual lending, complete private photo/document uploads, installment schedules and scheduled penalty accrual, disbursal and repayment allocation rules, cash session reconciliation, live audit-log and report views, organization onboarding, and production deployment configuration. Aadhaar/PAN documents and full numbers should be handled only after a privacy and access review. Local PIN is a convenience lock, not an authentication method. Apply the SQL migration in a new Supabase project before enabling live registrations.
