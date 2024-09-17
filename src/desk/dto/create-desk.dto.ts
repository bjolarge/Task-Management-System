import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { CreateLestDto } from "./create-lest.dto";

export class CreateDeskDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    foreignNumber:string;

    @IsString()
    @IsNotEmpty()
    deskDetails:string;

    @IsObject()
    lesting:CreateLestDto;
}
