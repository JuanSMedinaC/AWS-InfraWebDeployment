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

    public async register(email: string, name: string, lastName: string, password: string, role: string) {
        const response = await this.axios.post('/users/create', {
            email,
            name,
            lastName,
            password,
            role 
        });
        return response.data;
    }
}