document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const voltarBtn = document.getElementById('voltarBtn');

    // Máscara para CPF
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        }
    });

    // Máscara para telefone
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            e.target.value = value;
        }
    });

    // Add event listener for back button
    voltarBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const cpf = cpfInput.value.replace(/\D/g, '');
        const telefone = telefoneInput.value.replace(/\D/g, '');
        const dataNascimento = document.getElementById('dataNascimento').value;
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const mensagemElement = document.getElementById('mensagem');

        // Validações
        if (nome.length < 3) {
            mostrarMensagem('Nome deve ter no mínimo 3 caracteres', 'error');
            return;
        }

        if (cpf.length !== 11) {
            mostrarMensagem('CPF inválido', 'error');
            return;
        }

        if (telefone.length < 10 || telefone.length > 11) {
            mostrarMensagem('Telefone inválido', 'error');
            return;
        }

        if (!validarEmail(email)) {
            mostrarMensagem('Email inválido', 'error');
            return;
        }

        if (senha.length < 8) {
            mostrarMensagem('A senha deve ter no mínimo 8 caracteres', 'error');
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarMensagem('As senhas não coincidem', 'error');
            return;
        }

        // Se passou por todas as validações
        mostrarMensagem('Cadastro realizado com sucesso!', 'success');
        
        setTimeout(() => {
            window.location.href = 'confirmar.html';
        }, 2000);
    });

    function mostrarMensagem(texto, tipo) {
        const mensagemElement = document.getElementById('mensagem');
        mensagemElement.textContent = texto;
        mensagemElement.style.color = tipo === 'error' ? '#d93025' : '#28a745';
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});