import { IsString } from "class-validator";

export class CreateProductionDto{
    @IsString()
    productionAddress:string;

}