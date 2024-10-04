import { IsNotEmpty, IsString } from "class-validator";

export class CreateQrCodeDto {
    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    qrCodeImage: string;
}
