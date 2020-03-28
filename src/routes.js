import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewLocation from './pages/NewLocation';
import Trade from './pages/Trade';
import Reports from './pages/Reports';

export default function Routes(){
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/newlocation" component={NewLocation} />
            <Route path="/trade" component={Trade} />
            <Route path="/reports" component={Reports} />
        </Switch>
    </BrowserRouter>
    )
}