import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { CreateHarpnerDto } from "./creater-harpner.dto";

export class CreateLearnerDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    learnerAge:number;

    @IsObject()
    learnersApt:CreateHarpnerDto;
}
