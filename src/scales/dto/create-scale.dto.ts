import { IsNotEmpty, IsNumber, IsObject, IsString, isNotEmpty } from "class-validator";
import { JoinColumn, OneToOne } from "typeorm";
import { Scale } from "../entities/scale.entity";
import { CreateScalingDto } from "./create-scaling.dto";

export class CreateScaleDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    weight:number;

    @IsObject()
    scaling:CreateScalingDto;
}
