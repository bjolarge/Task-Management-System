import { IsNotEmpty, IsNumber, IsObject, IsPositive, IsString } from "class-validator";
import { CreateManagementDto } from "./create-management.dto";

export class CreateManageDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    rating:number;

    @IsObject()
    management:CreateManagementDto;

}
