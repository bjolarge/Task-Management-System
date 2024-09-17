import { IsNotEmpty, IsNumber, IsObject, IsPositive, IsString } from "class-validator";
import { CreateProductionDto } from "./create-production.dto";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    color:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @IsNotEmpty()
    shape:string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    rating:number;

    @IsObject()
    @IsNotEmpty()
    production:CreateProductionDto;
}
