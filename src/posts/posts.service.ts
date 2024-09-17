import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import * as PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import { AuditService, TransportMethods } from '@appstellar/nestjs-audit';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly audit: AuditService
  ) {
    //audit service
    audit.addTransport(TransportMethods.CONSOLE);
    audit.setUserIdCallback((req) => req.headers.user.id);
    audit.logErrors = true;
  }
  
  findAll() {
    return this.postRepository.find();
  }

  
  async createPost(createPostDto:CreatePostDto) { 
    const post = await this.postRepository.create(createPostDto)
     return this.postRepository.save(post);
   }

   async generatePdf(): Promise<Buffer> {
    // Fetch posts from the database
    const posts = await this.postRepository.find();

    // Log posts to verify data fetching
    console.log('Fetched posts:', posts);

    // Create a new PDF document
    const doc = new PDFDocument();
    const stream = new PassThrough();
    const buffers: Buffer[] = [];

    // Collect PDF data from the stream
    stream.on('data', (chunk: Buffer) => buffers.push(chunk));
    stream.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      this.resolveBuffer(pdfBuffer);
    });

    // Pipe the PDF document to the PassThrough stream
    doc.pipe(stream);

    // Add content to the PDF
    doc.fontSize(20).text('Posts Report', { align: 'center' });
    doc.moveDown();

    // Define table structure
    const tableTop = 100;
    const rowHeight = 20;
    const columnWidths = [100, 300]; // Widths for each column
    const columns = ['Name', 'Description'];
    const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
    const tableLeft = 50; // X position of the table

    // Draw table with borders
    this.drawTable(doc, tableTop, rowHeight, columnWidths, columns, posts, tableWidth, tableLeft);

    doc.end();

    return new Promise<Buffer>((resolve, reject) => {
      this.resolveBuffer = resolve;
      stream.on('error', reject);
    });
  }

  private resolveBuffer?: (buffer: Buffer) => void;

  private drawTable(
    doc: PDFDocument,
    tableTop: number,
    rowHeight: number,
    columnWidths: number[],
    columns: string[],
    posts: Post[],
    tableWidth: number,
    tableLeft: number
  ) {
    const numRows = posts.length;

    // Draw table header
    doc.fontSize(14).font('Helvetica-Bold');
    this.drawTableRow(doc, tableTop, rowHeight, tableLeft, columnWidths, columns, true);

    // Draw table rows
    doc.fontSize(12).font('Helvetica');
    posts.forEach((post, index) => {
      const y = tableTop + rowHeight * (index + 1); // Offset for header and spacing
      this.drawTableRow(doc, y, rowHeight, tableLeft, columnWidths, [post.name, post.description], false);
    });

    // Draw table borders
    this.drawTableBorders(doc, tableTop, rowHeight, numRows + 1, tableWidth, tableLeft);
  }

  private drawTableRow(
    doc: PDFDocument,
    y: number,
    rowHeight: number,
    tableLeft: number,
    columnWidths: number[],
    columns: string[],
    isHeader: boolean
  ) {
    const textStyle = isHeader ? { fontSize: 14, font: 'Helvetica-Bold' } : { fontSize: 12, font: 'Helvetica' };
    doc.fontSize(textStyle.fontSize).font(textStyle.font);

    let x = tableLeft; // Starting X position for the row

    columns.forEach((column, index) => {
      // Draw the text in each cell
      doc.text(column, x + 2, y + 2, {
        width: columnWidths[index] - 4, // Margin within cell
        align: 'left'
      });
      x += columnWidths[index];
    });
  }

  private drawTableBorders(
    doc: PDFDocument,
    tableTop: number,
    rowHeight: number,
    numRows: number,
    tableWidth: number,
    tableLeft: number
  ) {
    const bottomY = tableTop + rowHeight * numRows;

    // Draw the outer border
    doc.rect(tableLeft, tableTop, tableWidth, rowHeight * numRows).stroke();

    // Draw column borders
    let x = tableLeft;
    const columnWidths = [100, 300];
    columnWidths.forEach((width) => {
      x += width;
      doc.moveTo(x, tableTop).lineTo(x, bottomY).stroke();
    });

    // Draw row borders
    let y = tableTop;
    for (let i = 0; i <= numRows; i++) {
      doc.moveTo(tableLeft, y).lineTo(tableLeft + tableWidth, y).stroke();
      y += rowHeight;
    }
  }

//correct and going one
  // async generatePdf(): Promise<Buffer> {
  //   // Fetch posts from the database
  //   const posts = await this.postRepository.find();

  //   // Log posts to verify data fetching
  //   console.log('Fetched posts:', posts);

  //   // Create a new PDF document
  //   const doc = new PDFDocument();
  //   const stream = new PassThrough();
  //   const buffers: Buffer[] = [];

  //   // Collect PDF data from the stream
  //   stream.on('data', (chunk: Buffer) => buffers.push(chunk));
  //   stream.on('end', () => {
  //     const pdfBuffer = Buffer.concat(buffers);
  //     this.resolveBuffer(pdfBuffer);
  //   });

  //   // Pipe the PDF document to the PassThrough stream
  //   doc.pipe(stream);

  //   // Add content to the PDF
  //   doc.fontSize(20).text('Posts Report', { align: 'center' });
  //   doc.moveDown();

  //   // Define table structure
  //   const tableTop = 100;
  //   const rowHeight = 20;
  //   const columnWidths = [100, 300]; // Widths for each column
  //   const columns = ['Name', 'Description'];

  //   // Draw table headers
  //   this.drawTable(doc, tableTop, rowHeight, columnWidths, columns, posts);

  //   doc.end();

  //   return new Promise<Buffer>((resolve, reject) => {
  //     this.resolveBuffer = resolve;
  //     stream.on('error', reject);
  //   });
  // }

  // private resolveBuffer?: (buffer: Buffer) => void;

  // private drawTable(
  //   doc: PDFDocument,
  //   tableTop: number,
  //   rowHeight: number,
  //   columnWidths: number[],
  //   columns: string[],
  //   posts: Post[]
  // ) {
  //   // Draw table header
  //   doc.fontSize(14).font('Helvetica-Bold');
  //   this.drawTableRow(doc, tableTop, rowHeight, columnWidths, columns);
    
  //   // Draw table rows
  //   doc.fontSize(12).font('Helvetica');
  //   posts.forEach((post, index) => {
  //     const y = tableTop + rowHeight * (index + 1);
  //     this.drawTableRow(doc, y, rowHeight, columnWidths, [post.name, post.description]);
  //   });
  // }

  // private drawTableRow(
  //   doc: PDFDocument,
  //   y: number,
  //   rowHeight: number,
  //   columnWidths: number[],
  //   columns: string[]
  // ) {
  //   let x = 50; // Initial X position
    
  //   columns.forEach((column, index) => {
  //     doc.text(column, x, y, {
  //       width: columnWidths[index],
  //       align: 'left'
  //     });
  //     x += columnWidths[index];
  //   });
    
  //   doc.moveDown();
  // }

}
