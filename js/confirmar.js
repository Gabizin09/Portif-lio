document.getElementById('confirmarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const confirmarEmail = document.getElementById('confirmarEmail').value;
    const mensagem = document.getElementById('mensagem');

    if (email === confirmarEmail) {
        mensagem.style.color = '#28a745';
        mensagem.textContent = 'Email confirmado com sucesso!';
        // Aqui você pode adicionar a lógica para enviar os dados para o servidor
        setTimeout(() => {
            window.location.href = 'login.html'; // Redireciona para a página de login
        }, 2000);
    } else {
        mensagem.style.color = '#d93025';
        mensagem.textContent = 'Os emails não coincidem. Por favor, verifique.';
    }
});