import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus,faFileDownload } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus,faFileDownload);
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
