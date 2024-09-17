import { IsString } from "class-validator";

export class CreateLeptDto{
   @IsString()
   contact:string; 
}