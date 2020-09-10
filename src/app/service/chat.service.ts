import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: SocketIOClient.Socket;
  constructor() {
    this.socket = io('http://localhost:4000');
  }
  sendMessage(msg: string): void {
    this.socket.emit('sendMessage', { message: msg });
  }
  onNewMessage(): void {
    return Observable.create(observer => {
      this.socket.on('newMessage', msg => {
        observer.next(msg);
      });
    });
  }
}
