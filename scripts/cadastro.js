document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already registered
    if (localStorage.getItem('userRegistered')) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('cadastroForm');

    // Adiciona evento de clique no botão voltar
    document.getElementById('voltarBtn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    function mostrarMensagem(mensagem, tipo) {
        const msg = document.createElement('div');
        msg.textContent = mensagem;
        msg.className = `mensagem ${tipo}`;
        form.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }

    function validarFormulario() {
        const senha = document.getElementById('senha').value;
        
        if (senha.length < 8) {
            mostrarMensagem('A senha deve ter no mínimo 8 caracteres', 'error');
            return false;
        }

        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            // Save user registration status
            localStorage.setItem('userRegistered', 'true');
            
            // Save user email for login
            const email = document.getElementById('email').value;
            localStorage.setItem('userEmail', email);

            mostrarMensagem('Cadastro realizado com sucesso!', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
});