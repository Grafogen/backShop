import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "src/prisma.service";
import {AuthDto} from "src/auth/auth.dto";
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
    }


    async register(dto: AuthDto) {
        const oldUser = await this.prisma.user.findUnique({
            where: {
                email:dto.email}
        })
        if(oldUser)throw new BadRequestException('User alredy exists')

        const user=await this.prisma.user.create({
            data:{
                email:dto.email,
                name:faker.name.firstName(),
                password:await hash(dto.password),

            }
        })

    }
}

