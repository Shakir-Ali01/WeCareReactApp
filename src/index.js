import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./component/Header";
import Footer from "./component/Footer";
import CoachSignup from "./coachcomponent/CoachSignup";
import CoachLogin from "./coachcomponent/CoachLogin";
import CoachProfile from "./coachcomponent/CoachProfile";
import UserLogin from "./usercomponent/UserLogin";
import UserSignup from "./usercomponent/UserSignup";
import CoachDashboard from "./coachcomponent/CoachDashboard";
import UserDashboard from "./usercomponent/UserDashboard";
import UserProfile from "./usercomponent/UserProfile";
import UserAppointment from"./usercomponent/UserAppointment";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <Routes>
        <Route index element={<App />}/>
        <Route path="home" element={<App />}/>
        <Route path="coachsignup" element={<CoachSignup />}/>
        <Route path="usersignup" element={<UserSignup />}/>
        <Route path="coachdashboard" element={<CoachDashboard />}/>
        <Route path="coachschedule" element={<CoachDashboard />}/>
        <Route path="coachprofile" element={<CoachProfile />}/>
        <Route path="coachlogin" element={<CoachLogin />}/>
        <Route path="userlogin" element={<UserLogin />}/>
        <Route path="usersignup" element={<UserSignup />}/>
        <Route path="userdashboard" element={<UserDashboard />}/>
        <Route path="userprofile" element={<UserProfile />}/>
        <Route path="userappointments" element={<UserAppointment />}/>
    </Routes>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
