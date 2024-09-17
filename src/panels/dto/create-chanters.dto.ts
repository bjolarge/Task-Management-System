import { IsString } from "class-validator";

export class CreateChantersDto{
    @IsString()
    channelCode:string;
}