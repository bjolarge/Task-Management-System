import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('streamData')
    handleStreamData(@MessageBody() data: any): void {
        // Handle incoming data, and stream it back to clients
        this.server.emit('streamData', data);
    }
}


  
  