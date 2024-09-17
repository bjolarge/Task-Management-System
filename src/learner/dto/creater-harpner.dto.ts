import { IsNotEmpty, IsString } from "class-validator";

export class CreateHarpnerDto {
    @IsString()
    @IsNotEmpty()
    address:string;
}