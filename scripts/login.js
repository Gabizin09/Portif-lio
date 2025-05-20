document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const lembrar = document.getElementById('lembrar').checked;

    if (email && senha) {
        // Remove completamente os botões do DOM
        const btn = document.querySelector('.login-btn');
        const link = document.querySelector('.cadastro-link');
        if (btn) btn.remove();
        if (link) link.remove();

        // Salva o login no localStorage
        localStorage.setItem('ultimoLogin', JSON.stringify({
            email: email,
            lembrar: lembrar,
            data: new Date().toISOString()
        }));

        // Cria e insere um elemento com o nome do usuário
        const userInfo = document.createElement('p');
        userInfo.classList.add('user-info');
        userInfo.textContent = 'Bem-vindo, ' + email;
        document.querySelector('.login-form').appendChild(userInfo);

        // Opcional: redirecionar após alguns segundos
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    }
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