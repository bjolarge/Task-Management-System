import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,

  private readonly cloudinaryService:CloudinaryService
  ) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   return this.productsService.uploadImageToCloudinary(file);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const filecheck = file.size<=2048 && file.mimetype==='jpg' || file.mimetype==='jpeg' || file.mimetype==='png';
    if(file){
      const result = await this.cloudinaryService.uploadImage(file.path);
      if(filecheck){
      return result;
      }
      }
    } catch (error) {
      throw new BadRequestException('Failed to upload image! The size or type is incompatible - use 2mb max and jpeg or jpg or png format');
    }
  }


//   @Post("upload")
//   // file here is the input name which must tally with the html syntax
//  //@UseGuards(AuthGuard('jwt'))
//  //@UseGuards(AuthGuard('jwt'))
//   @UseInterceptors(FileInterceptor("file", {
//       storage:diskStorage({
//           destination:"./uploads",
//           filename:(req, file, callback):void=>{
//               const name = file.originalname.split(".")[0];
//               const fileExtension = file.originalname.split(".")[1];
//               const newFileName = name.split(" ").join("_")+"_" + Date.now()+ "." + fileExtension;

//               callback(null, newFileName);
//           }
//       }),
//       fileFilter:(req,file,callback)=>{
//       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//           return callback(null, false);
//       }
//       callback(null, true);
//       }
//   }))
//   uploadPhoto(@UploadedFile(
//       new ParseFilePipe({
//           validators: [
//             new MaxFileSizeValidator({ maxSize: 510000 }),
//           ],
//         }),
//   ) file:Express.Multer.File):void{
//       if(!file){
//           throw new BadRequestException("File is not an image/ not in the required jpg,jpeg,png format");
//       }
// }


  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }


}
