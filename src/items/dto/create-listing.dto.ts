import { IsString } from "class-validator";

export class CreateListingDto{
    @IsString()
    description:string;
}