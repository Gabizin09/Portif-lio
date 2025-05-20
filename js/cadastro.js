// filepath: \\sn928escoladfp1\pastas alunos$\53782613848\Desktop\Portif-lio\js\cadastro.js
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const idioma = document.getElementById('idioma').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (cpf && telefone && idioma && email && senha) {
        // Disable form inputs and button
        const inputs = document.querySelectorAll('input, select, button');
        inputs.forEach(input => input.disabled = true);

        // Create user object
        const userData = {
            cpf: cpf,
            telefone: telefone,
            idioma: idioma,
            email: email,
            senha: senha
        };

        // Get existing users or initialize empty array
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Add new user
        users.push(userData);

        // Save back to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store email temporarily for confirmation page
        sessionStorage.setItem('emailToConfirm', email);

        document.getElementById('mensagem').style.color = '#ff3300';
        document.getElementById('mensagem').textContent = 'Cadastro realizado! Redirecionando para confirmação...';
        
        // Redirect to confirmation page after 2 seconds
        setTimeout(() => {
            window.location.href = 'confirmar.html';
        }, 2000);
    } else {
        document.getElementById('mensagem').style.color = '#ff3300';
        document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
    }
});

document.getElementById('voltarBtn').addEventListener('click', function() {
    window.location.href = 'index.html';  // Changed from 'login.html' to 'index.html'
});

// Add input masks for CPF and phone number
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        e.target.value = value;
    }
});

document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        e.target.value = value;
    }
});