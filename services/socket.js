import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { processMessage, getHelpMessage } from './chatbot.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'parabellum-chat-jwt-secret';
export function initSocket(server) {
    const io = new Server(server, {
        cors: { origin: '*' }
    });

    const chat = io.of('/chat');

    chat.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Token de autenticación requerido'));
        }
        try {
            const decoded = jwt.verify(token, getJwtSecret());
            socket.user = decoded;
            next();
        } catch (err) {
            return next(new Error('Token inválido o expirado'));
        }
    });

    chat.on('connection', (socket) => {
        const { nombre, rol, alias } = socket.user;
        const displayName = alias || nombre;

        socket.join(rol === 'admin' ? 'admins' : 'users');

        chat.emit('message', {
            id: Date.now().toString(),
            type: 'system',
            user: 'Sistema',
            text: `${displayName} se ha conectado al chat`,
            time: new Date().toISOString()
        });

        setTimeout(() => {
            socket.emit('message', {
                id: Date.now().toString() + '-help',
                type: 'chatbot',
                user: '🤖 Asistente Virtual',
                text: getHelpMessage(),
                time: new Date().toISOString()
            });
        }, 500);

        socket.on('message', async (data) => {
            const messageText = data?.text?.trim();
            if (!messageText) return;

            const userMsg = {
                id: Date.now().toString(),
                type: 'user',
                user: displayName,
                role: rol,
                text: messageText,
                time: new Date().toISOString()
            };
            chat.emit('message', userMsg);

            try {
                const botResponse = await processMessage(messageText);
                if (botResponse) {
                    setTimeout(() => {
                        chat.emit('message', {
                            id: (Date.now() + 1).toString(),
                            type: 'chatbot',
                            user: '🤖 Asistente Virtual',
                            text: botResponse,
                            time: new Date().toISOString()
                        });
                    }, 800);
                }
            } catch (error) {
                console.error('Chatbot error:', error);
            }
        });

        socket.on('disconnect', () => {
            chat.emit('message', {
                id: Date.now().toString(),
                type: 'system',
                user: 'Sistema',
                text: `${displayName} se ha desconectado del chat`,
                time: new Date().toISOString()
            });
        });
    });

    return io;
}
