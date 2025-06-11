import { AppDataSource } from "../config/database";
import { UserDto } from "../dto/user.dto";
import { User } from "../entities/user";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, userDto: UserDto): Promise<User | null> {
    const user = await this.getById(id);
    if (!user) return null;
    Object.assign(user, userDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return true;
  }
}
