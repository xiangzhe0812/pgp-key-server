import { Inject, Injectable, Logger } from "@nestjs/common";
import { User } from "../data/entities/user.entity";
import { Repository } from "typeorm";
import { IUserService } from "../interfaces";

@Injectable()
export class UserService implements IUserService {
    private readonly logger = new Logger("UserService");
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        this.logger.verbose("Retrieving all users");
        return this.userRepository.find();
    }
}
