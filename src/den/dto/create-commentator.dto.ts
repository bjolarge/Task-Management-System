import { IsString } from "class-validator";

export class CreateCommentator{
    @IsString()
    content:string; 
}