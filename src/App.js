import React from 'react';
import Navbar from './layout/Navbar';
import Users from './components/Users';
import AddUser from "./forms/AddUser";
import UpdateUser from "./forms/UpdateUser";
import './App.css';
import NotFound from "./pages/NotFound";
import Contribute from "./pages/Contribute";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

function App(){

        return (
            <Router>
                    <div className="container">

                            <Navbar title={"App Page"}/>
                            <hr/>
                            <div className="row d-flex justify-content-center">
                                    <Switch>
                                            <Route exact path={"/"} component = {Users}/>
                                            <Route exact path={"/add"} component = {AddUser}/>
                                            <Route exact path={"/edit/:id"} component = {UpdateUser}/>
                                            <Route exact path={"/github"} component = {Contribute}/>
                                            <Route component={NotFound}/>
                                    </Switch>
                            </div>
                    </div>
            </Router>

        );

}
export default App;
