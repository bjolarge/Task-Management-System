import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { CreateLents } from "./create-lents.dto";
import { CreateCommentator } from "./create-commentator.dto";

export class CreateDenDto {
    @IsString()
    @IsNotEmpty()
    detailedAddress:string;

    @IsNumber()
    @IsNotEmpty()
    age:number;

    @IsObject()
    lentDents:CreateLents;

    @IsObject()
    comments:CreateCommentator;

}
