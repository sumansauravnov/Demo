import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ClientDashboard from "./pages/AdminDashboard/ClientDashboard/ClientDashboard";
import ArbitratorDashboard from "./pages/AdminDashboard/ArbitratorDashboard/ArbitratorDashboard";
import { ResetDashboard } from "./pages/ResetPassword/ResetDashboard";
import { ResetOTP } from "./pages/ResetPassword/ResetOTP";
import { SetPassword } from "./pages/ResetPassword/SetPassword";
import Sidebar from "./components/Sidebar";
import AddArbitrator from "./pages/AdminDashboard/ArbitratorDashboard/addArbitrator";
import AddClient from "./pages/AdminDashboard/ClientDashboard/addClient";
import ClientMain from "./pages/clinetMainPage/ClientMain";
import ArbitratorMain from "./pages/arbitratorMainPage/ArbitratorMain";
import Uploadcase from "./pages/AdminDashboard/UploadCases/Uploadcase";
import DefaulterPage from "./pages/AdminDashboard/UploadCases/defaulter/[caseid]";
import ClientCases from "./pages/clinetMainPage/ClientCases";
import ArbitratorCases from "./pages/arbitratorMainPage/ArbitratorCases";

function App() {
  return (
    <>
      <div className="flex">
        {/* Only show sidebar for authenticated routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/resetdashboard" element={<ResetDashboard />} />
          <Route path="/resetdashboard/otp" element={<ResetOTP />} />
          <Route path="/resetdashboard/setpassword" element={<SetPassword />} />

          {/* Authenticated routes with sidebar */}
          <Route
            path="/*"
            element={
              <div className="flex w-full">
                <Sidebar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/client" element={<ClientMain />} />
                    <Route path="/client/case" element={<ClientCases />} />
                    <Route path="/arbitrator" element={<ArbitratorMain />} />
                    <Route
                      path="/arbitrator/cases"
                      element={<ArbitratorCases />}
                    />

                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/clienttable" element={<ClientDashboard />} />
                    <Route
                      path="/arbitratortable"
                      element={<ArbitratorDashboard />}
                    />
                    <Route
                      path="/arbitrator/addarbitrator"
                      element={<AddArbitrator />}
                    />
                    <Route path="/client/addclient" element={<AddClient />} />
                    <Route path="/admin/cases" element={<Uploadcase />} />
                    <Route
                      path="/defaulter/:caseid"
                      element={<DefaulterPage />}
                    />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
