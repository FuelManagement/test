import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const Route_Dashboard = ({
                                component_imp: Component_Imp,
                                component_exp: Component_Exp,
                                component_ref: Component_Ref,
                                component_adm: Component_Adm,
                                 ...rest }) => {

    let user = localStorage.getItem('user');
    user = typeof user === "string"? JSON.parse(user):{};
    // return (
    //     <Route {...rest} render={props => (
    //         user.role === 'Importer' ? <Component_Imp {...props} />
    //         : user.role === 'Exporter' ? <Component_Exp {...props} />
    //         : user.role === 'Refinery' ? <Component_Ref {...props} />
    //         : user.role === 'Admin'    ? <Component_Adm {...props} />
    //         : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
    //     )} />

        return (
            <Route {...rest} render={props => (
                user.role === 'Importer' ? <Component_Imp {...props} />
                : user.role === 'Exporter' ? <Component_Exp {...props} />
                : user.role === 'Refinery' ? <Component_Ref {...props} />
                : user.role === 'Admin'    ? <Component_Adm {...props} />
                : user.role != 'Admin'    ? <Component_Adm {...props} />
                :<Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            )} />

        
    )
   
}
