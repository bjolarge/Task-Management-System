import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { CreateLorryDto } from "./create-lorry.dto";

export class CreateFrozenDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    phoneNumber:string;

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsObject()
    lorry:CreateLorryDto;
}
