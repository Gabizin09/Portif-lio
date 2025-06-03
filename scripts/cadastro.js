document.addEventListener('DOMContentLoaded', function() {
    // Seleção dos campos
    const form = document.getElementById('cadastroForm');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const dataInput = document.getElementById('dataNascimento');

    // Máscara para CPF
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // Máscara para telefone
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 5) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/(\d*)/, '($1');
        }
        e.target.value = value;
    });

    // Máscara para data de nascimento (formato DD/MM/AAAA)
    dataInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 4) {
            value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        }
        e.target.value = value;
    });

    // Envio do formulário e armazenamento no localStorage
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const usuario = {
            nome: document.getElementById('nome').value,
            telefone: telefoneInput.value,
            dataNascimento: dataInput.value,
            cpf: cpfInput.value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        };

        localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

        alert('Cadastro realizado com sucesso!');
        form.reset();
    });

    console.log(JSON.parse(localStorage.getItem('usuarioCadastrado')));
});
