document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user
    const user = users.find(u => u.email === email && u.senha === senha);

    if (user) {
        document.getElementById('mensagem').style.color = '#28a745';
        document.getElementById('mensagem').textContent = 'Login realizado com sucesso!';
        
        // Store logged user info
        localStorage.setItem('loggedUser', JSON.stringify(user));

        // Redirect to index after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        document.getElementById('mensagem').textContent = 'E-mail ou senha incorretos!';
    }
});

document.getElementById('voltarBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
});