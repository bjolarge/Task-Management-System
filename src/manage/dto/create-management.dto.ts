import { IsString } from "class-validator";

export class CreateManagementDto{
    @IsString()
    description:string;
}