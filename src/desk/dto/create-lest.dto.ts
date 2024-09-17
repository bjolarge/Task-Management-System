import { IsNotEmpty, IsString } from "class-validator";

export class CreateLestDto{
    @IsString()
    @IsNotEmpty()
    address:string;
}