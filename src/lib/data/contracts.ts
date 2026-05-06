export type Contract = {
  id: string;
  title: string;
  amount: number;
  paymentType: number; 
  contractType: 'Fixed rate' | 'Pay as you go' | 'Milestone'; 
  status: 'In Review' | 'Rejected' | 'Active' | 'Completed';
  period: {startDate: string; endDate: string;};
};

export const mockContracts: Contract[] = [
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'In Review',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Rejected',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Active',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Active',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
  {
    id: '0x6885afa...63b3',
    title: 'Insyder Website & Webapp Design',
    amount: 6000.00,
    paymentType: 1,
    contractType: "Fixed rate",
    status: 'Completed',
    period: {
        startDate: '25th Oct 2022',
        endDate: '25th Nov 2023'
    },
  },
];

export interface contractHistoryFilter {
    contractType?: string;
};
