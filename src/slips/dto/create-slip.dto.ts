import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";
import { CreateFlipDto } from "./create-flip.dto";
import { CreateTagDto } from "./create-tag.dto";

export class CreateSlipDto {
    @IsString()
    @IsNotEmpty()
    slipName:string;

    @IsString()
    @IsNotEmpty()
    slipDetails:string;

   @IsObject()
    flip:CreateFlipDto;

    @IsArray()
    tags:CreateTagDto[];
}
