import { IsNotEmpty, IsString } from "class-validator";

export class CreateLorryDto{
   @IsString()
   @IsNotEmpty()
   sortCode:string; 
}