import { IsNotEmpty, IsString } from "class-validator";

export class CreateFlipDto{
    @IsString()
    @IsNotEmpty()
    fonts:string;
}