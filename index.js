const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const messageField = document.getElementById('message');
const messageHelp = document.getElementById('messageHelp');

form.addEventListener('submit', function(e) {
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
});