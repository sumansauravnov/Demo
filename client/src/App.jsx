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

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/arbitrator" element={<ArbitratorDashboard />} />
        <Route path="/resetdashboard" element={<ResetDashboard />} />
        <Route path="/resetdashboard/otp" element={<ResetOTP />} />
        <Route path="/resetdashboard/setpassword" element={<SetPassword />} />
      </Routes> */}

      <div className="flex">
        {/* Only show sidebar for authenticated routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/resetdashboard" element={<ResetDashboard />} />
          <Route path="/resetdashboard/otp" element={<ResetOTP />} />
          <Route path="/resetdashboard/setpassword" element={<SetPassword />} />
          <Route path="/client" element={<ClientMain />} />
          <Route path="/arbitrator" element={<ArbitratorMain />} />

          {/* Authenticated routes with sidebar */}
          <Route
            path="/*"
            element={
              <div className="flex w-full">
                <Sidebar />
                <div className="flex-1">
                  <Routes>
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
                    <Route path="/client/cases" element={<Uploadcase />} />
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
