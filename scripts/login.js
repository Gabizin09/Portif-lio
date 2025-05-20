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
    const senhaInput = document.getElementById('senha');
    
    // Você pode adicionar um botão para mostrar/ocultar senha
    // Exemplo:
    // const toggleSenha = document.createElement('button');
    // toggleSenha.type = 'button';
    // toggleSenha.onclick = () => {
    //     senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
    // };
});