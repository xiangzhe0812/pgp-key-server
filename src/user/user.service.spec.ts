import { UserModule } from "./user.module";
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { expect } from "chai";
import { DatabaseModule } from "../data/database.module";
import { userProviders } from "./user.providers";
import { ConfigModule } from "@nestjs/config";
import { IUserService } from "src/interfaces";

describe("UserService", () => {
    let service: IUserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                UserModule,
                ConfigModule.forRoot({
                    isGlobal: true
                })
            ],
            providers: [...userProviders, UserService]
        }).compile();

        service = module.get<IUserService>(UserService);
    });

    it("should be defined", () => {
        expect(service).to.be.not.undefined;
    });

    it("should return an array of users", async () => {
        const users = await service.findAll();
        expect(users).to.be.an("array");
    });
});
