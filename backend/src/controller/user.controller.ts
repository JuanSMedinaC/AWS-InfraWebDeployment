import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { User, UserInput } from "../entity/user";
import { error } from "console";

const userService = new UserService();

class UserController {
  public async create(req: Request, res: Response): Promise<any> {
    const { email, name, lastName, password, role } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email ya está en uso" });
    }

    try {
      const newUser = await userService.createUser(req.body as UserInput, req, res);
      if( newUser){
        return res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
      }else{
        throw error;
      }
    } catch (error) {
      return res.status(500).json({ message: "Error al crear el usuario", error });
    }
  }
  public async getAll(req : Request, res: Response) : Promise<any>{
    var userList = await userService.getAll();
    return res.status(200).json(userList);
  }

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const token = await userService.login(req.body);
      return res.status(200).json(token);
    } catch (error) {
      return res.status(400).json({ message: "Error al iniciar sesión", error });
    }
  }

}
export default new UserController();
