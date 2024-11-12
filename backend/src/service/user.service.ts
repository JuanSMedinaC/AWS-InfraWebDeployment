import { error } from "console";
import { AppDataSource } from "../config/db";
import { UserLoginDto } from "../dto/userLogin.dto";
import { User, UserInput, UserRole } from "../entity/user";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userInput: UserInput, req: Request, res: Response): Promise<User| null> {
    userInput.password = await bcrypt.hash(userInput.password, 10);
    
    if (!Object.values(UserRole).includes(userInput.role)) {
      throw error("Invalid role");
    }

    const user = this.userRepository.create(userInput);

    return await this.userRepository.save(user);
  }

  public async login(userInput : UserLoginDto) {
    try {
        const userExist =  await this.findUserByEmail(userInput.email);
        if(!userExist)
            throw error("User not found");
        const isMatch:boolean =  await bcrypt.compare(userInput.password, userExist.password);
        if (!isMatch)
            throw error("Not authorized");
        const token = this.generateToken(userExist);

        return {token, user: userExist};
    } catch (error) {
        throw error;
    } 
  }   
  
  private generateToken(user: User): string {
    try {
      return  jwt.sign({user_id: user.id, email: user.email, name: user.name}, process.env.JWT_SECRET || "secret", {expiresIn: "1m"});
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<User[] | null > {
    return await this.userRepository.find();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
