import { AppDataSource } from "../config/db";
import { User, UserRole } from "../entity/user";
import * as bcrypt from "bcrypt";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(email: string, name: string, lastName: string, password: string, roles: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    var role
    if (roles=="seller"){
      role= UserRole.SELLER
    }else{
      role = UserRole.BUYER
    }
    
    // Create user and assign roles
    const user = this.userRepository.create({
      email,
      name,
      lastName,
      password: hashedPassword,
      role
    });

    return await this.userRepository.save(user); // Save the user to DB
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
