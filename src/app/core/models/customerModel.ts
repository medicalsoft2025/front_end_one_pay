export interface CustomerModel {
    id: string;
    birthdate: string;
    documentNumber: string;
    documentType: 'CC' | 'CE' | 'NIT' | 'PP';
    email: string;
    firstName: string;
    lastName: string;
    nationality: string;
    phoneNumber: string;
    customerType: 'CLIENT' | 'PROVIDER';
    enableNotifications: boolean;
    onePayId: string;
    status: 'REGISTERED' | 'VERIFIED' | 'SUSPENDED' | 'DEACTIVATED';
}

