import { User } from "./../data/entities/user.entity";
import { Controller, Get, HttpStatus, Inject } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IUserService } from "../interfaces";

@Controller("user")
export class UserController {
    constructor(@Inject("IUserService") private userService: IUserService) {}

    @Get()
    @ApiOperation({ summary: "Get users" })
    @ApiResponse({
        status: HttpStatus.OK
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST
    })
    async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
