// filepath: \\sn928escoladfp1\pastas alunos$\53782613848\Desktop\Portif-lio\js\cadastro.js
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && senha) {
        // Disable form inputs and button
        const inputs = document.querySelectorAll('input, button');
        inputs.forEach(input => input.disabled = true);

        // Create user object
        const userData = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Get existing users or initialize empty array
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Add new user
        users.push(userData);

        // Save back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        document.getElementById('mensagem').style.color = '#28a745';
        document.getElementById('mensagem').textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        document.getElementById('mensagem').style.color = '#dc3545';
        document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
    }
});

document.getElementById('voltarBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
});