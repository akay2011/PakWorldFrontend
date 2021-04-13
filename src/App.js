import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/homePage";
import SuppliersPage from "./pages/suppliersPage";
import logo from "./img/Pakworld.png";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import useToken from "./components/auth/useToken";
import EmployeePage from "./pages/employeePage";
import EmployeesPage from "./pages/employeesPage";
import SupplierPage from "./pages/supplierPage";
import {Switch, Route} from "react-router";


function App() {
    const { token, setToken } = useToken();
    const { setUser } = useUser();
    const pathname = window.location.pathname
    const adminUser = `YWRtaW5hZG1pbnN1cGVyc2VjcmV0`

    if(!token) {
        if(pathname === '/signup'){
            return <SignupPage/>
        }
        return <LoginPage setToken={setToken}  setUser={setUser}/>
    }
    return (
        <BrowserRouter>
            <Switch>
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light bg-light">
                        <a className="navbar-brand" target="_blank">
                            <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com"/>
                        </a>
                        <Link to="/" className="navbar-brand">PAK WORLD LTD</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/suppliers" className="nav-link">Suppliers</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/employees" className="nav-link">Employees</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/business" className="nav-link">Business</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link
                                        onClick={()=> {
                                            setToken('')
                                        }}
                                        to="/" className="nav-link">Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br/>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/suppliers" exact component={SuppliersPage} />
                    <Route path="/supplier/:id" component={SupplierPage} />
                    <Route path="/employees" component={() => <EmployeesPage authorisedUser={adminUser} />}/>
                    <Route path="/employee/:id" component={EmployeePage} />
                   
                </div>
            </Switch>
        </BrowserRouter>
    );

}

export default App;