document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const campoSenha = document.getElementById('senha');
    const campoConfirmarSenha = document.getElementById('confirmarSenha');
    const campoCPF = document.getElementById('cpf');
    const campoTelefone = document.getElementById('telefone');

    // Máscara para CPF
    campoCPF.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // Máscara para telefone
    campoTelefone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
        e.target.value = value;
    });

    // Toggle de visibilidade da senha
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });

    // Função para verificar se o usuário já existe
    function usuarioJaExiste(email) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        return usuarios.some(user => user.email === email);
    }

    // Validação do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const cpf = campoCPF.value.replace(/\D/g, '');
        const telefone = campoTelefone.value.replace(/\D/g, '');
        const email = document.getElementById('email').value.trim().toLowerCase();
        const senha = campoSenha.value;
        const confirmarSenha = campoConfirmarSenha.value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const termos = document.getElementById('termos').checked;

        // Validações
        if (nome.length < 3) {
            mostrarMensagem('O nome deve ter pelo menos 3 caracteres', 'error');
            return;
        }

        if (cpf.length !== 11) {
            mostrarMensagem('CPF inválido', 'error');
            return;
        }

        if (telefone.length < 10) {
            mostrarMensagem('Telefone inválido', 'error');
            return;
        }

        if (!validarEmail(email)) {
            mostrarMensagem('E-mail inválido', 'error');
            return;
        }

        if (usuarioJaExiste(email)) {
            mostrarMensagem('Este e-mail já está cadastrado', 'error');
            return;
        }

        if (senha.length < 8) {
            mostrarMensagem('A senha deve ter pelo menos 8 caracteres', 'error');
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarMensagem('As senhas não coincidem', 'error');
            return;
        }

        if (!termos) {
            mostrarMensagem('Você deve aceitar os termos de uso', 'error');
            return;
        }

        // Criar objeto do usuário
        const novoUsuario = {
            id: Date.now(),
            nome,
            cpf,
            telefone,
            email,
            senha: btoa(senha), // Codificação básica
            dataNascimento,
            dataCadastro: new Date().toISOString()
        };

        // Recuperar array de usuários existente ou criar novo
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Salvar usuário atual na sessão
        sessionStorage.setItem('usuarioAtual', JSON.stringify({
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            email: novoUsuario.email
        }));

        mostrarMensagem('Cadastro realizado com sucesso!', 'success');

        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    });

    function mostrarMensagem(texto, tipo) {
        const mensagem = document.getElementById('mensagem');
        mensagem.textContent = texto;
        mensagem.className = 'mensagem ' + tipo;
        mensagem.style.display = 'block';

        setTimeout(() => {
            mensagem.style.display = 'none';
        }, 3000);
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});