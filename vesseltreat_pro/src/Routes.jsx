import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import VesselManagement from "pages/vessel-management";
import TreatmentLogForm from "pages/treatment-log-form";
import UserManagement from "pages/user-management";
import Dashboard from "pages/dashboard";
import ReportsAnalytics from "pages/reports-analytics";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vessel-management" element={<VesselManagement />} />
        <Route path="/treatment-log-form" element={<TreatmentLogForm />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;