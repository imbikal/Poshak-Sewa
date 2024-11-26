import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar';
import publicRoutesList from '../../routes/Publicroutelist';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const FrontendLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Switch>
                    {publicRoutesList.map((routedata, idx) => {
                        return (
                            routedata.component && (
                                <Route 
                                    key={idx}
                                    path={routedata.path}
                                    exact={routedata.exact}
                                    name={routedata.name}
                                    render={(props) => (
                                        <routedata.component {...props} />
                                    )}
                                />
                            )
                        );
                    })}
                </Switch>
            </div>
            {/* Uncomment the following block if you want to add a WhatsApp chat feature */}
            {/* <div className="whatsapp-chat">
                <a href="">
                    <img src={process.env.PUBLIC_URL + '/components/frontend/images/whatsapp.png'} alt="whatsapp-chat" />
                </a>
            </div> */}
        </div>
    );
}

export default FrontendLayout;
