import { IsString } from "class-validator";

export class CreateScalingDto{
   @IsString()
    limit:string;
}