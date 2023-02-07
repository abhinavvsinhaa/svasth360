import { io } from "socket.io-client";
import env from "../config/environment";

const SOCKET_URL = env.SOCKET_URL

class WSService {
    initializeSocket = () => {
        try {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket']
            })
            
            this.socket.on('connect', data => {
                console.log('Socket connected')
            })

            this.socket.on('disconnect', data => {
                console.log('Socket disconnected')
            })

            this.socket.on('error', error => {
                console.log('error in socket', error)
            })

        } catch (error) {
            console.log('error initializing socket', error)
        }
    }

    emit(event, payload) {
        this.socket.emit(event, payload)
    }

    on(event, callback) {
        this.socket.on(event, callback)
    }
}

const SocketService = new WSService();

export default SocketService;
