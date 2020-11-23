import React, { Fragment } from "react";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "../components/navbar";
import { LoginPage, SignupPage } from "./Auth";
import MainPage from "./Main";
import { ProfilePage } from "./User";
import { ResumeListPage, ResumeFormPage } from "./Resume";
import { VacancyDetailList } from "./Vacancy";


const AppRouter = () => {
    return (
        <Fragment>
            <Router>
                <Navbar />

                <div className="container mt-3 mb-3">
                    <Switch>
                        <Route path="/" component={ MainPage } exact />
                        <Route path="/login/" component={ LoginPage } exact/>
                        <Route path="/register/" component={ SignupPage } exact/>
                        <Route path="/profile/" component={ ProfilePage } exact/>
                        <Route path="/resume/" component={ ResumeListPage } exact/>
                        <Route path="/resume/new/" component={ ResumeFormPage } exact/>
                        <Route path="/resume/update/:id/" component={ ResumeFormPage } exact strict/>
                        <Route path="/vacancy/:id/" component={ VacancyDetailList } exact strict/>

                    </Switch>
                </div>
            </Router>
        </Fragment>
    );
};

export default AppRouter;