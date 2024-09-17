import { IsNotEmpty, IsString } from "class-validator"

export class ProfileDto{
    @IsString()
    @IsNotEmpty()
    gender: string

    @IsString()
    @IsNotEmpty()
    photo: string
}