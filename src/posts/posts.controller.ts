import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {Response} from 'express'
import { Audit } from '@appstellar/nestjs-audit';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('now')
  async createdPost(@Body()createPostDto:CreatePostDto){
    return this.postsService.createPost(createPostDto)
  }

  @Get()
  @Audit()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('generate-pdf')
  async generatePdf(@Res() res: Response) {
    try {
      const pdfBuffer = await this.postsService.generatePdf();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="posts-report.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).send('Error generating PDF');
    }
  }
}
