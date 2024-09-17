import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreatePlentDto {
    @IsString()
    @IsNotEmpty()
    apt:string;

    @IsBoolean()
    current:boolean;
}
