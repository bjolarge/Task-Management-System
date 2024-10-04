import { IsNotEmpty, IsString } from "class-validator";

export class CreateTestimonyDto {
    // @IsString()
    // @IsNotEmpty()
    name:string;

    // @IsString()
    // @IsNotEmpty()
    testimony:string;
}
