document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação real
    // Exemplo: redirecionar para a página principal após o login
    window.location.href = "index.html";
});