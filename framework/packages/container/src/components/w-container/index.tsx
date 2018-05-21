import * as React from "react";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import WLoginPage from '../w-login-page';
import WMainPage from '../w-main-page';

class WContainer extends React.Component<{},{}> { 
    constructor(props, context) {
        super(props, context);
    }  

    render() {
        
        return (            
            <BrowserRouter> 
                <div>
                    <Route path="/">
                        {/* <Redirect from="/" to="/main"/> */}
                    </Route>
                    <Route exact path="/main" component={WMainPage} />
                    <Route path="/login" component={WLoginPage} />                    
                </div>
            </BrowserRouter>
        );
    }
};

export default WContainer;