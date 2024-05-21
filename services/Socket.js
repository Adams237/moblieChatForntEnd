import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Remplacez par votre adresse IP et port

export const Socket = socket;
