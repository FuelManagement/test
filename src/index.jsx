import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus,faFileDownload,faEye, faEdit, faCheckSquare,faTruckMoving} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus,faFileDownload,faEye, faEdit, faCheckSquare,faTruckMoving);
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
