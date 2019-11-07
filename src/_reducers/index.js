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
import {orderTrackingRequest} from './orderTrackingRequest.reducer'
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
  orderTrackingRequest
});

export default rootReducer;
