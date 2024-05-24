import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./utils/stateVariables";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerRegistration from "./pages/PlayerRegistration";
import Privacy from "./pages/Privacy";
import RefundPage from "./pages/RefundPage";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Dashboard from "./pages/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}/>
          <Route path="playerRegister" Component={PlayerRegistration} />
          <Route path="privacy" Component={Privacy} />
          <Route path="cancellation-refund" Component={RefundPage} />
          <Route path="support" Component={Support} />
          <Route path="terms" Component={Terms} />
          <Route path="dashboard" Component={Dashboard} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
