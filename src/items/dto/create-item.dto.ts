import { IsBoolean, IsObject, IsString } from "class-validator";
import { CreateListingDto } from "./create-listing.dto";

export class CreateItemDto {
    @IsString()
    name:string;

    @IsBoolean()
    public:boolean;

    @IsObject()
   listing:CreateListingDto;

}