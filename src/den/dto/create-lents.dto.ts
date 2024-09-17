import { IsNotEmpty, IsString } from "class-validator";

export class CreateLents{
    @IsString()
    @IsNotEmpty()
    postOrder:string;
}