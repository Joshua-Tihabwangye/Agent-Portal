# EVzone Agent Portal (Vite + React + TypeScript + MUI + Tailwind)

This project is a **plug-and-play** starter for the EVzone Agent Portal.

## Quick start

```bash
npm install
npm run dev
```

Open the dev server URL shown in your terminal.

## Demo auth

Login uses a local stub so the app works end-to-end without any backend.

- Any email/password works
- Role is inferred from email keywords:
  - contains `super` → supervisor
  - contains `safety` → safety
  - contains `onboard` → onboarding
  - contains `dispatch` → dispatch
  - contains `qa` → qa
  - contains `t2` → support_t2
  - otherwise → support_t1

First login routes you to **/agent/welcome**. Clicking **Start required training** unlocks the portal (demo)
and routes you into **/agent/training**.

## Theme

- Default is **Light Mode**
- Toggle in the shell header
- Theme is persisted in `localStorage` (`evzone_agent_theme`)
- Tailwind `dark` class is synced automatically

## Bookings demo flow

Manual Dispatch → Confirm step writes a booking to `localStorage` (`evzone_agent_bookings`).
My Bookings reads this store so you can validate the full flow.

## Routing (pages included)

All routes are based on the pages you provided:

- Auth & entry: `/agent/login`, `/agent/forgot-password`, `/agent/welcome`
- Dashboards: `/agent/dashboard`, `/agent/dashboard/supervisor`
- Live ops: `/agent/live-ops`, `/agent/live-ops/trips/:tripId`, `/agent/live-ops/drivers/:driverId`
- Dispatch: `/agent/dispatch/new/*`, `/agent/dispatch/board`
- My bookings: `/agent/bookings`, `/agent/bookings/:bookingId`
- Onboarding: `/agent/onboarding/drivers`, `/agent/onboarding/drivers/:driverId`, `/agent/drivers/:driverId`
- Profiles: `/agent/riders/:riderId`, `/agent/companies/:companyId`
- Support: `/agent/support/tickets`, `/agent/support/tickets/:ticketId`
- Safety: `/agent/safety/sos`, `/agent/safety/incidents/:incidentId`
- Search: `/agent/search`
- Training: `/agent/training`, `/agent/training/modules/:moduleId`
- QA: `/agent/qa`, `/agent/qa/reviews/:reviewId`
- Settings: `/agent/settings/teams`, `/agent/settings/shifts`, `/agent/settings/roles`
- Profile: `/agent/profile`
- System: `/agent/404`, `/agent/access-denied`

## Notes

This starter intentionally keeps TypeScript **non-strict** for smooth onboarding. Once your team is ready,
you can turn `strict` back on in `tsconfig.app.json` and gradually add types.
