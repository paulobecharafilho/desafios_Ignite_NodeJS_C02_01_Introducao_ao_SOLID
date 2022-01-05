import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  execute({ user_id }): User[] {
    const userIsAdmin = this.usersRepository.findById(user_id);

    if (!userIsAdmin) {
      throw new Error("User doesn't exists to request this");
    }

    if (userIsAdmin.admin !== true) {
      throw new Error("This user doesn't have permission");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
