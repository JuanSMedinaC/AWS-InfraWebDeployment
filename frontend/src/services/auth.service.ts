import axios, {AxiosInstance}  from 'axios';

export class AuthService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios= axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000,
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async login(email: string, password: string) {

        console.log(email, password);
        const response = await this.axios.post('/users/login', {
            email,
            password
        });
        console.log(response.data);

        return response.data;
    }

    public async register(fullName: string, email: string, password: string, address: string, roleName: 'buyer' | 'seller') {
        console.log(fullName, email, password, address, roleName);
        const response = await this.axios.post('/auth/register', {
            fullName,
            email,
            password,
            address,
            roleName,
        });
        return response.data;
    }
}