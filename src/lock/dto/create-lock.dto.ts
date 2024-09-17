import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";
import { CreatePankDto } from "./create-pank.dto";
import { Lomment } from "../entities/lomment.entity";
import { LommentDto } from "./lomment.dto";

export class CreateLockDto {
    @IsString()
    @IsNotEmpty()
    lockApp:string;

    @IsString()
    @IsNotEmpty()
    clearNap:string;

    @IsObject()
    pank:CreatePankDto;

    // @IsArray()
    // lomment:LommentDto[];
}
