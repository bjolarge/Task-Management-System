import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Chanters } from "../entities/chanters.entity";
import { CreateChantersDto } from "./create-chanters.dto";

export class CreatePanelDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    panelDescription:string;

   
    @IsObject()
    chanters:CreateChantersDto;

}