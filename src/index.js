import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './utils/stateVariables';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import './index.css';

// Components & Pages
import PlayerRegistration from './pages/PlayerRegistration';
import RefundPage from './pages/RefundPage';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Terms from './pages/Terms';
import App from './App';
import ThanksPage from './pages/Thanks';
import { Toaster } from 'react-hot-toast';
import SidebarContainer from './components/common/SideBarContainer';
import AdminMenu from './components/Admin/AdminMenu';
import PlayerDashboard from './pages/PlayerDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Toaster />
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="playerRegister" Component={PlayerRegistration} />
                    <Route path="privacy" Component={Privacy} />
                    <Route path="cancellation-refund" Component={RefundPage} />
                    <Route path="support" Component={Support} />
                    <Route path="terms" Component={Terms} />
                    <Route path="thanks" Component={ThanksPage} />
                    <Route path="side" Component={SidebarContainer} />
                    {/* <Route path="*" element={<NoPage />} /> */}
                    {/* Dashboard Routes */}
                    <Route path="dashboard" Component={Dashboard} />
                    <Route path="admin" Component={AdminMenu} />
                    <Route path="players" Component={PlayerDashboard} />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
