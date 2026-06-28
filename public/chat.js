(function () {
    'use strict';

    var chatWidget = document.getElementById('chat-widget');
    if (!chatWidget) return;

    var toggleBtn = document.getElementById('chat-toggle');
    var closeBtn = document.getElementById('chat-close');
    var panel = document.getElementById('chat-panel');
    var messagesEl = document.getElementById('chat-messages');
    var inputEl = document.getElementById('chat-input');
    var sendBtn = document.getElementById('chat-send');
    var notificationDot = document.querySelector('.chat-notification-dot');

    var socket = null;
    var connected = false;
    var unreadCount = 0;

    toggleBtn.addEventListener('click', function () {
        var isOpen = panel.classList.toggle('open');
        toggleBtn.classList.toggle('hidden', isOpen);
        if (isOpen) {
            unreadCount = 0;
            notificationDot.style.display = 'none';
            scrollToBottom();
            if (!connected) connectSocket();
        }
    });

    closeBtn.addEventListener('click', function () {
        panel.classList.remove('open');
        toggleBtn.classList.remove('hidden');
    });

    function connectSocket() {
        fetch('/api/chat/token')
            .then(function (res) {
                if (!res.ok) throw new Error('No se pudo obtener token');
                return res.json();
            })
            .then(function (data) {
                socket = io('/chat', {
                    auth: { token: data.token },
                    transports: ['websocket', 'polling']
                });

                socket.on('connect', function () {
                    connected = true;
                    messagesEl.innerHTML = '';
                });

                socket.on('message', function (msg) {
                    appendMessage(msg);
                });

                socket.on('connect_error', function (err) {
                    console.error('Socket error:', err.message);
                    if (!messagesEl.querySelector('.chat-error')) {
                        messagesEl.innerHTML = '<div class="chat-error">Error de conexión. Recargá la página.</div>';
                    }
                });

                socket.on('disconnect', function () {
                    connected = false;
                });
            })
            .catch(function () {
                messagesEl.innerHTML = '<div class="chat-error">Error al conectar. Recargá la página.</div>';
            });
    }

    function sendMessage() {
        var text = inputEl.value.trim();
        if (!text || !socket || !connected) return;

        socket.emit('message', { text: text });
        inputEl.value = '';
        inputEl.style.height = 'auto';
    }

    sendBtn.addEventListener('click', sendMessage);

    inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    inputEl.addEventListener('input', function () {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
    });

    function appendMessage(data) {
        var loading = messagesEl.querySelector('.chat-loading');
        if (loading) loading.remove();
        var error = messagesEl.querySelector('.chat-error');
        if (error) error.remove();

        var msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg chat-msg--' + data.type;

        var time = new Date(data.time);
        var timeStr = time.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

        msgDiv.innerHTML =
            '<div class="chat-msg-header">' +
            '<span class="chat-msg-user">' + escapeHtml(data.user) + '</span>' +
            '<span class="chat-msg-time">' + timeStr + '</span>' +
            '</div>' +
            '<div class="chat-msg-text">' + formatText(escapeHtml(data.text)) + '</div>';

        messagesEl.appendChild(msgDiv);
        scrollToBottom();

        if (!panel.classList.contains('open') && data.type !== 'system') {
            unreadCount++;
            notificationDot.style.display = 'flex';
            notificationDot.textContent = unreadCount > 9 ? '9+' : unreadCount;
        }
    }

    function scrollToBottom() {
        requestAnimationFrame(function () {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        });
    }

    function formatText(text) {
        return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();
