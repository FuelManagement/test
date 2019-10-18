import React from 'react';
import {ContactDetailForm} from './ContactDetailForm';
import {OrganizationDetailForm} from './OrganizationDetailForm';
import {AccountDetailForm} from './AccountDetailForm';
import {TaxDetailForm} from './TaxDetailForm';

export const steps = [
    {name: 'Organization Details', component: <OrganizationDetailForm />},
    {name: 'Contact Details', component: <ContactDetailForm />},
    {name: 'Account Details', component: <AccountDetailForm />},
    {name: 'Tax Details', component: <TaxDetailForm />}
  ];
  