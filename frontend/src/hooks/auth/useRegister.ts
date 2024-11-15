import { User } from "@/interfaces/user";
import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";

export const useRegister = () => {
    const register = async (email: string, name: string, lastName: string, password: string, role: string) => {
        const authService = new AuthService(process.env.NEXT_PUBLIC_API_URL || "");
        const response = await authService.register(email, name, lastName, password, role);

        if (response) {
            const user: User = {
                id: response.id,
                name: response.name,
                lastName: response.lastName,
                email: response.email,
                role: response.role
            };
            Cookies.set("currentUser", JSON.stringify(user));
        }

        return response as User;
    }

    return { register };
};