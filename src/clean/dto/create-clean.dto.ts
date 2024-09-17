import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCleanDto {
    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsNumber()
    @IsNotEmpty()
    discount:number;

    @IsNumber()
    @IsNotEmpty()
    Balance:number;
}
