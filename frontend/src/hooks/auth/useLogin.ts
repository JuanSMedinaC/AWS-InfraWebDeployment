import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const authService = new AuthService(process.env.NEXT_PUBLIC_API_URL || "");
        const response = await authService.login(email, password);
        if (response){
            Cookies.set("token", response.access_token);
        }

        return response;
    }

    return { login };
};
