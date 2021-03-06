import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Transaksi',
    icon: 'nb-home',
    link: '/pages/master/risk-register',
  },
  {
    title: 'Master',
    icon: 'nb-locked',
    children: [
      {
        title: 'Company Input',
        link: '/pages/master/company-input',
      },
      {
        title: 'Risk Indicator',
        link: '/pages/master/risk-indicator',
      },
      {
        title: 'Risk Matriks Indicator',
        link: '/pages/master/risk-matriks-indicator',
      },
      {
        title: 'Financial Indicator Risk',
        link: '/pages/master/financial-indicator-risk',
      },
      {
        title: 'Operational Indicator Risk',
        link: '/pages/master/operational-indicator-risk',
      },
      {
        title: 'Qualitative Indicator Risk',
        link: '/pages/master/qualitative-indicator',
      },
    ],
  },  
  {
    title: 'Reminder',
    icon: 'nb-home',
    link: '/pages/reminder',
  },
];
