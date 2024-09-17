import { IsString, IsNumber } from "class-validator";
export class CreateDropdownDto {

  @IsString()
    name: string;

    @IsString()
    value:string;

    @IsString()
    label:string;
    
}
