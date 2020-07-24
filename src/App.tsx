import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth/Auth';
import Migrate from './components/Migrate/Migrate';
import Home from './components/Home';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header title="Google Photos Migration" />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/auth" >
                        <Auth />
                    </Route>
                    <Route path="/migrate">
                        <Migrate />
                    </Route>

                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
