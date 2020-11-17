export class Account {
    id: number;
    phoneModel: string;
    phoneImei: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    secretAnswers: string[] = [];

    constructor() { }
}
