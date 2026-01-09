const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const messageField = document.getElementById('message');
const messageHelp = document.getElementById('messageHelp');

async function enviarMensajeAPI(nombre, email, mensaje) {
    try {
        const response = await fetch('http://185.241.151.197:8001/api/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, mensaje })
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

form.addEventListener('submit',async function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');

    let errores = [];

    [name, email, messageField].forEach(input => input.style.borderColor = '#ccc');
    formMessage.textContent = '';
    formMessage.style.color = 'green';

    if (name.value.trim() === '') {
        errores.push('El nombre es obligatorio');
        name.style.borderColor = 'red';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        errores.push('El email es obligatorio');
        email.style.borderColor = 'red';
    } else if (!emailRegex.test(email.value.trim())) {
        errores.push('El email no es válido');
        email.style.borderColor = 'red';
    }

    if (messageField.value.trim() === '') {
        errores.push('El mensaje es obligatorio');
        messageField.style.borderColor = 'red';
    }
    
    if (errores.length > 0) {
        formMessage.textContent = errores.join(', ');
        formMessage.style.color = 'red';
    } else {
        try {
            const resultado = await enviarMensajeAPI(
                name.value.trim(),
                email.value.trim(),
                messageField.value.trim()
            );
            console.log('Respuesta de la API:', resultado);
            alert("Gracias por contactarnos");
            form.reset();
            messageHelp.style.display = 'none';
        } catch {
            formMessage.textContent = 'No se pudo enviar el mensaje. Intenta nuevamente.';
            formMessage.style.color = 'red';
        }
    }
});

messageField.addEventListener('focus', () => {
    messageHelp.style.display = 'block';
});

messageField.addEventListener('blur', () => {
    messageHelp.style.display = 'none';
});