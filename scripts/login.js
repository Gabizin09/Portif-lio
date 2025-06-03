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