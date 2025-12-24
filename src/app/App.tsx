import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "../layout/RequireAuth";
import AgentAppShell from "../layout/AgentAppShell";

// Auth
import AgentLoginPage from "../pages/auth/AgentLoginPage";
import AgentForgotPasswordPage from "../pages/auth/AgentForgotPasswordPage";
import AgentWelcomeTrainingGatePage from "../pages/auth/AgentWelcomeTrainingGatePage";

// Dashboards
import AgentDashboardPage from "../pages/dashboard/AgentDashboardPage";
import SupervisorDashboardPage from "../pages/dashboard/SupervisorDashboardPage";

// Live ops
import LiveOpsMapViewPage from "../pages/liveOps/LiveOpsMapViewPage";
import LiveOpsTripDetailPage from "../pages/liveOps/LiveOpsTripDetailPage";
import LiveOpsDriverDetailPage from "../pages/liveOps/LiveOpsDriverDetailPage";

// Dispatch
import DispatchNewStartPage from "../pages/dispatch/DispatchNewStartPage";
import DispatchNewRidePage from "../pages/dispatch/DispatchNewRidePage";
import DispatchNewDeliveryPage from "../pages/dispatch/DispatchNewDeliveryPage";
import DispatchNewRentalPage from "../pages/dispatch/DispatchNewRentalPage";
import DispatchNewSchoolShuttlePage from "../pages/dispatch/DispatchNewSchoolShuttlePage";
import DispatchNewTourPage from "../pages/dispatch/DispatchNewTourPage";
import DispatchNewEmsPage from "../pages/dispatch/DispatchNewEmsPage";
import DispatchAssignDriverPage from "../pages/dispatch/DispatchAssignDriverPage";
import DispatchConfirmBookingPage from "../pages/dispatch/DispatchConfirmBookingPage";
import DispatchBoardPage from "../pages/dispatch/DispatchBoardPage";

// Bookings
import MyBookingsPage from "../pages/bookings/MyBookingsPage";
import BookingDetailPage from "../pages/bookings/BookingDetailPage";

// Onboarding
import DriverOnboardingQueuePage from "../pages/onboarding/DriverOnboardingQueuePage";
import DriverOnboardingCasePage from "../pages/onboarding/DriverOnboardingCasePage";
import DriverProfileReadOnlyPage from "../pages/onboarding/DriverProfileReadOnlyPage";

// Profiles
import RiderProfilePage from "../pages/profiles/RiderProfilePage";
import CompanyProfilePage from "../pages/profiles/CompanyProfilePage";

// Support
import TicketQueuePage from "../pages/support/TicketQueuePage";
import TicketDetailPage from "../pages/support/TicketDetailPage";

// Safety
import SOSQueuePage from "../pages/safety/SOSQueuePage";
import IncidentDetailPage from "../pages/safety/IncidentDetailPage";

// Search
import GlobalSearchPage from "../pages/search/GlobalSearchPage";

// Training
import TrainingCentrePage from "../pages/training/TrainingCentrePage";
import TrainingModuleDetailPage from "../pages/training/TrainingModuleDetailPage";
import TrainingAssessmentPage from "../pages/training/TrainingAssessmentPage";
import TrainingCertificatePage from "../pages/training/TrainingCertificatePage";

// QA
import { AgentQAReviewDetailPage, AgentQAReviewsListPage } from "../pages/qa/QACoachingPages";

// Settings
import {
  AgentRolesSettingsPage,
  AgentShiftsSettingsPage,
  AgentTeamsSettingsPage,
} from "../pages/settings/SettingsTeamsRolesShiftsPage";
import TeamDetailPage from "../pages/settings/TeamDetailPage";

// Profile
import AgentProfilePreferencesPage from "../pages/profile/AgentProfilePreferencesPage";

// System
import AgentNotFoundPage from "../pages/system/AgentNotFoundPage";
import AgentAccessDeniedPage from "../pages/system/AgentAccessDeniedPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/agent/login" replace />} />

      {/* Public */}
      <Route path="/agent/login" element={<AgentLoginPage />} />
      <Route path="/agent/forgot-password" element={<AgentForgotPasswordPage />} />
      <Route path="/agent/welcome" element={<AgentWelcomeTrainingGatePage />} />

      {/* System */}
      <Route path="/agent/404" element={<AgentNotFoundPage />} />
      <Route path="/agent/access-denied" element={<AgentAccessDeniedPage requiredRole="" />} />

      {/* Authenticated routes */}
      <Route element={<RequireAuth />}>
        <Route element={<AgentAppShell />}>
          {/* Dashboards */}
          <Route path="/agent/dashboard" element={<AgentDashboardPage />} />
          <Route path="/agent/dashboard/supervisor" element={<SupervisorDashboardPage />} />

          {/* Live Ops */}
          <Route path="/agent/live-ops" element={<LiveOpsMapViewPage />} />
          <Route path="/agent/live-ops/trips/:tripId" element={<LiveOpsTripDetailPage />} />
          <Route path="/agent/live-ops/drivers/:driverId" element={<LiveOpsDriverDetailPage />} />

          {/* Manual Dispatch */}
          <Route path="/agent/dispatch/new" element={<DispatchNewStartPage />} />
          <Route path="/agent/dispatch/new/ride" element={<DispatchNewRidePage />} />
          <Route path="/agent/dispatch/new/delivery" element={<DispatchNewDeliveryPage />} />
          <Route path="/agent/dispatch/new/rental" element={<DispatchNewRentalPage />} />
          <Route path="/agent/dispatch/new/school-shuttle" element={<DispatchNewSchoolShuttlePage />} />
          <Route path="/agent/dispatch/new/tour" element={<DispatchNewTourPage />} />
          <Route path="/agent/dispatch/new/ems" element={<DispatchNewEmsPage />} />
          <Route path="/agent/dispatch/new/assign" element={<DispatchAssignDriverPage />} />
          <Route path="/agent/dispatch/new/confirm" element={<DispatchConfirmBookingPage />} />

          <Route path="/agent/dispatch/board" element={<DispatchBoardPage />} />

          {/* My bookings */}
          <Route path="/agent/bookings" element={<MyBookingsPage />} />
          <Route path="/agent/bookings/:bookingId" element={<BookingDetailPage />} />

          {/* Driver onboarding */}
          <Route path="/agent/onboarding/drivers" element={<DriverOnboardingQueuePage />} />
          <Route path="/agent/onboarding/drivers/:driverId" element={<DriverOnboardingCasePage />} />
          <Route path="/agent/drivers/:driverId" element={<DriverProfileReadOnlyPage />} />

          {/* Rider & company profiles */}
          <Route path="/agent/riders/:riderId" element={<RiderProfilePage />} />
          <Route path="/agent/companies/:companyId" element={<CompanyProfilePage />} />

          {/* Support tickets */}
          <Route path="/agent/support/tickets" element={<TicketQueuePage />} />
          <Route path="/agent/support/tickets/:ticketId" element={<TicketDetailPage />} />

          {/* Safety */}
          <Route path="/agent/safety/sos" element={<SOSQueuePage />} />
          <Route path="/agent/safety/incidents/:incidentId" element={<IncidentDetailPage />} />

          {/* Search */}
          <Route path="/agent/search" element={<GlobalSearchPage />} />

          {/* Training */}
          <Route path="/agent/training" element={<TrainingCentrePage />} />
          <Route path="/agent/training/modules/:moduleId" element={<TrainingModuleDetailPage />} />
          <Route path="/agent/training/assessments/:assessmentId" element={<TrainingAssessmentPage />} />
          <Route path="/agent/training/certificates/:moduleId" element={<TrainingCertificatePage />} />

          {/* QA */}
          <Route path="/agent/qa" element={<AgentQAReviewsListPage />} />
          <Route path="/agent/qa/reviews/:reviewId" element={<AgentQAReviewDetailPage />} />

          {/* Settings */}
          <Route path="/agent/settings/teams" element={<AgentTeamsSettingsPage />} />
          <Route path="/agent/settings/teams/:teamId" element={<TeamDetailPage />} />
          <Route path="/agent/settings/shifts" element={<AgentShiftsSettingsPage />} />
          <Route path="/agent/settings/roles" element={<AgentRolesSettingsPage />} />

          {/* Profile */}
          <Route path="/agent/profile" element={<AgentProfilePreferencesPage />} />

          {/* Catch-all inside shell */}
          <Route path="/agent/*" element={<AgentNotFoundPage />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<AgentNotFoundPage />} />
    </Routes>
  );
}
