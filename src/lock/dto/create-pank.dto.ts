import { IsString } from "class-validator";

export class CreatePankDto{
@IsString()
clank:string;
}