import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const Route_Orders = ({
                                component_imp: Component_Imp,
                                component_exp: Component_Exp,
                                component_ref: Component_Ref,
                                 ...rest }) => {

    let user = localStorage.getItem('user');
    user = typeof user === "string"? JSON.parse(user):{};
    return (
        <Route {...rest} render={props => (
            user.role === 'Importer'
            ? <Component_Imp {...props} />
            : user.role === 'Exporter'
            ? <Component_Exp {...props} />
            : user.role === 'Refinery'
            ? <Component_Ref {...props} />
            : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )} />
    )
}
