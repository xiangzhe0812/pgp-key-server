import { userProviders } from "./user.providers";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../data/database.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        ...userProviders,
        {
            provide: "IUserService",
            useClass: UserService
        }
    ]
})
export class UserModule {}
