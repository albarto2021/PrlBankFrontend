import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopBar from "./components/shared/TopBar";
import Header from "./components/shared/Header";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import PasswordChangePage from "./pages/PasswordChangePage";
import MyAccountsPage from "./pages/MyAccountsPage";

import UserInfoPage from "./pages/UserInfoPage"
import Users from "./components/admin/Users";



const App = () => {
  return (
    <Router>
      <TopBar />
      <Header />
      <NavBar />
      <Switch>
        <Route path="/updatePassword" component={PasswordChangePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage}/>
        <Route path="/about" component={AboutUsPage} />
        <Route path="/myaccounts" component={MyAccountsPage} />
        <Route path="/updateUserInfo" component={UserInfoPage}/>
        <Route path="/admin/allusers" component={Users}/>
        <Route path="/" component={HomePage} />
       
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
