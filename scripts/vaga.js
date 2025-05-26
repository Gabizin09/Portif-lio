// Carregar os detalhes da vaga específica
document.addEventListener('DOMContentLoaded', function() {
    // Pegar o ID da vaga da URL
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    // Encontrar a vaga correspondente
    const job = jobListings.find(j => j.id === jobId);
    
    if (!job) {
        window.location.href = 'index.html';
        return;
    }

    // Exibir os detalhes da vaga
    const vagaDetalhes = document.getElementById('vagaDetalhes');
    vagaDetalhes.innerHTML = `
        <h2>${job.title}</h2>
        <div class="job-company">
            <strong>${job.company}</strong>
            <span class="job-location">📍 ${job.location}</span>
        </div>
        <div class="job-type-badge">${job.type}</div>
        <div class="job-salary">
            <i class="salary-icon">💰</i> ${job.salary}
        </div>
        <div class="job-description">
            ${job.description}
        </div>
        <div class="job-details">
            <div class="requirements">
                <h4>Requisitos:</h4>
                <ul>
                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            <div class="benefits">
                <h4>Benefícios:</h4>
                <ul>
                    ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Configurar o formulário de candidatura
    const candidaturaForm = document.getElementById('candidaturaForm');
    candidaturaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar a candidatura
        const formData = new FormData(candidaturaForm);
        
        // Simular envio bem-sucedido
        alert('Candidatura enviada com sucesso!');
        window.location.href = 'index.html';
    });
});
