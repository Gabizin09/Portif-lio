document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const lembrar = document.getElementById('lembrar').checked;

    // Aqui você pode adicionar sua lógica de autenticação
    // Por exemplo, enviar para um servidor ou verificar localmente

    console.log('Tentativa de login:', { email, lembrar });

    // Simulando um login bem-sucedido
    // Substitua isto pela sua lógica real de autenticação
    if (email && senha) {
        // Redirecionar para a página principal após login bem-sucedido
        window.location.href = 'index.html';
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