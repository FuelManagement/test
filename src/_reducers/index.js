import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { exporters } from './exporters.reducer';
import { refinerys } from './refinery.reducer';
import { alert } from './alert.reducer';
import { admin } from './admin.reducer';
import { onboard } from './onboard.reducer';
import { product } from './product.reducer';
import { rfq } from './rfq.reducer';
import {userProfile} from './userProfile.reducer';
import {io} from './io.reducer';
<<<<<<< HEAD
import {gpsAuth} from './gpsAuth.reducer';
=======
import {orderTrackingRequest} from './orderTrackingRequest.reducer';
import { orderTracking } from './orderTracking.reducer';
import { gpsAuth } from './gpsAuth.reducer';
>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  exporters,
  refinerys,
  admin,
  onboard,
  product,
  rfq,
  io,
  userProfile,
<<<<<<< HEAD
=======
  orderTrackingRequest,
  orderTracking,
>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
  gpsAuth
});

export default rootReducer;
