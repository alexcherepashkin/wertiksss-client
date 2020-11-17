export class JwtData {
    token: string;
    tokenType?: string;
    id: number;
    username: string;
    password?: string;
    email?: string;
    roles: string[] = [];

    constructor() { }
}
