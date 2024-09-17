import { IsString } from "class-validator";

export class LommentDto{
@IsString()
content:string;
}