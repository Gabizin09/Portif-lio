document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    // Máscara para CPF
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        }
    });

    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length === 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });

    // Toggle senha
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });

    // Validação do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const cpf = cpfInput.value.replace(/\D/g, '');
        const telefone = telefoneInput.value.replace(/\D/g, '');
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
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

        // Armazenar dados do usuário no localStorage
        const user = {
            nome,
            cpf,
            telefone,
            email,
            senha,
            dataNascimento
        };
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Usuário cadastrado:', user);

        // Se passou por todas as validações
        mostrarMensagem('Cadastro realizado com sucesso!', 'success');
        
        // Redirecionar para home.html após 2 segundos
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