        document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Check if email matches registered email
        const registeredEmail = localStorage.getItem('userEmail');
        
        if (email === registeredEmail && senha) {
            // Login successful
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.textContent = 'Email ou senha inválidos';
            errorMsg.className = 'error-message';
            loginForm.appendChild(errorMsg);
            setTimeout(() => errorMsg.remove(), 3000);
        }
    });
});

// Mostrar/ocultar senha
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se existe cadastro no localStorage
    const userData = localStorage.getItem('userData');
    if (!userData) {
        alert('Por favor, faça seu cadastro primeiro!');
        window.location.href = 'cadastro.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Pegar dados do localStorage
        const storedData = JSON.parse(localStorage.getItem('userData'));
        
        if (storedData && storedData.email === email && storedData.password === password) {
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
});