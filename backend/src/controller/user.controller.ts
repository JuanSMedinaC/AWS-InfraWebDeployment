import { Request, Response } from "express";
import { UserService } from "../service/user.service";


const userService = new UserService();

class UserController {
  public async create(req: Request, res: Response): Promise<any> {
    const { email, name, lastName, password, roles } = req.body;

    // Verifica que no exista otro usuario con el mismo email
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email ya está en uso" });
    }

    try {
      const newUser = await userService.createUser(email, name, lastName, password, roles);
      return res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear el usuario", error });
    }
  }
}
export default new UserController();
