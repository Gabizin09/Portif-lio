document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validações
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Criar objeto com dados do usuário
        const userData = {
            nome: nome,
            email: email,
            password: password,
            telefone: telefoneInput.value,
            cpf: cpfInput.value,
            dataNascimento: dataNascimentoInput.value
        };
        
        // Salvar no localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    });
    
    // Formatação do telefone
    const telefoneInput = document.getElementById('telefone');

    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');
        
        // Aplica a máscara (DD) XXXXX-XXXX
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        }
        
        // Atualiza o valor do input
        e.target.value = value;
    });

    // Validação do telefone
    telefoneInput.addEventListener('blur', function(e) {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length !== 11) {
            telefoneInput.setCustomValidity('Digite um número de telefone válido com DDD');
        } else {
            telefoneInput.setCustomValidity('');
        }
    });

    // Formatação do CPF
    const cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');
        
        // Aplica a máscara XXX.XXX.XXX-XX
        if (value.length <= 11) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
        }
        
        // Atualiza o valor do input
        e.target.value = value;
    });

    // Validação do CPF
    cpfInput.addEventListener('blur', function(e) {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length !== 11) {
            cpfInput.setCustomValidity('Digite um CPF válido');
        } else if (!validaCPF(value)) {
            cpfInput.setCustomValidity('CPF inválido');
        } else {
            cpfInput.setCustomValidity('');
        }
    });

    // Função para validar CPF
    function validaCPF(cpf) {
        if (cpf.length !== 11) return false;
        
        // Elimina CPFs inválidos conhecidos
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Valida 1o dígito
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digito = 11 - (soma % 11);
        if (digito > 9) digito = 0;
        if (digito !== parseInt(cpf.charAt(9))) return false;
        
        // Valida 2o dígito
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        digito = 11 - (soma % 11);
        if (digito > 9) digito = 0;
        if (digito !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }

    // Formatação da Data de Nascimento
    const dataNascimentoInput = document.getElementById('dataNascimento');

    dataNascimentoInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');
        
        // Aplica a máscara DD/MM/AAAA
        if (value.length <= 8) {
            value = value.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
        }
        
        // Atualiza o valor do input
        e.target.value = value;
    });

    // Validação da Data de Nascimento
    dataNascimentoInput.addEventListener('blur', function(e) {
        const value = e.target.value;
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        
        if (!regex.test(value)) {
            dataNascimentoInput.setCustomValidity('Digite uma data válida no formato DD/MM/AAAA');
            return;
        }
        
        const [, dia, mes, ano] = value.match(regex);
        const data = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        const idade = hoje.getFullYear() - data.getFullYear();
        
        // Verifica se é uma data válida
        if (data.getDate() != dia || data.getMonth() + 1 != mes || data.getFullYear() != ano) {
            dataNascimentoInput.setCustomValidity('Data inválida');
        }
        // Verifica idade mínima de 18 anos
        else if (idade < 18) {
            dataNascimentoInput.setCustomValidity('Você deve ter pelo menos 18 anos');
        }
        // Verifica se a data não é futura
        else if (data > hoje) {
            dataNascimentoInput.setCustomValidity('A data não pode ser futura');
        }
        else {
            dataNascimentoInput.setCustomValidity('');
        }
    });

    // Formatação e validação do nome
    const nomeInput = document.getElementById('nome');

    nomeInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Remove números e caracteres especiais
        value = value.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');
        
        // Capitaliza as primeiras letras
        value = value.replace(/\b\w/g, letter => letter.toUpperCase());
        
        // Atualiza o valor do input
        e.target.value = value;
    });

    nomeInput.addEventListener('blur', function(e) {
        const value = e.target.value.trim();
        const names = value.split(' ').filter(name => name.length > 0);
        
        if (names.length < 2) {
            nomeInput.setCustomValidity('Digite seu nome completo');
        } else if (value.length < 6) {
            nomeInput.setCustomValidity('Nome muito curto');
        } else {
            nomeInput.setCustomValidity('');
        }
    });

    // Modal para os termos
    const termsLinks = document.querySelectorAll('.terms-link');

    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-text"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Conteúdo dos termos
    const termsContent = {
        terms: `
            <h2>Termos de Uso</h2>
            <p>1. Ao utilizar nossos serviços, você concorda em:</p>
            <ul>
                <li>Fornecer informações verdadeiras e precisas</li>
                <li>Manter seus dados atualizados</li>
                <li>Não usar o serviço para fins ilegais</li>
                <li>Respeitar os direitos de outros usuários</li>
            </ul>
            <p>2. Nos reservamos o direito de:</p>
            <ul>
                <li>Modificar ou encerrar o serviço a qualquer momento</li>
                <li>Suspender contas que violem nossos termos</li>
            </ul>
        `,
        privacy: `
            <h2>Política de Privacidade</h2>
            <p>1. Coletamos os seguintes dados:</p>
            <ul>
                <li>Nome completo</li>
                <li>Email</li>
                <li>Telefone</li>
                <li>CPF</li>
                <li>Data de nascimento</li>
            </ul>
            <p>2. Seus dados são utilizados para:</p>
            <ul>
                <li>Identificação no sistema</li>
                <li>Comunicação importante</li>
                <li>Melhorar nossos serviços</li>
            </ul>
            <p>3. Seus dados são protegidos e não são compartilhados com terceiros.</p>
        `
    };

    // Event listeners para os links de termos
    termsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.dataset.terms;
            const modalText = modal.querySelector('.modal-text');
            modalText.innerHTML = termsContent[type];
            modal.style.display = 'flex';
        });
    });

    // Fechar modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Adicionar validação dos checkboxes no submit do form
    cadastroForm.addEventListener('submit', function(e) {
        if (!document.getElementById('termsCheck').checked || 
            !document.getElementById('privacyCheck').checked) {
            e.preventDefault();
            alert('Você precisa aceitar os Termos de Uso e a Política de Privacidade');
            return;
        }
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validações
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Criar objeto com dados do usuário
        const userData = {
            nome: nome,
            email: email,
            password: password,
            telefone: telefoneInput.value,
            cpf: cpfInput.value,
            dataNascimento: dataNascimentoInput.value
        };
        
        // Salvar no localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    });
});