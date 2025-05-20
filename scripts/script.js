const jobListings = [
    {
        title: "Desenvolvedor Frontend",
        company: "Tech Solutions",
        location: "São Paulo",
        description: "Desenvolvimento de interfaces web utilizando React.",
        salary: "R$ 5.000,00"
    },
    {
        title: "Analista de Dados",
        company: "DataCorp",
        location: "Remoto",
        description: "Análise de dados e criação de relatórios gerenciais.",
        salary: "R$ 6.500,00"
    },
    {
        title: "Gerente de Projetos",
        company: "InovaTech",
        location: "Rio de Janeiro",
        description: "Gerenciamento de projetos de tecnologia.",
        salary: "R$ 8.000,00"
    }
];

// Busca de vagas
const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchKeyword = document.getElementById('search-keyword').value.toLowerCase();
        const searchLocation = document.getElementById('search-location').value.toLowerCase();
        const results = jobListings.filter(job => {
            const matchesKeyword = job.title.toLowerCase().includes(searchKeyword) || job.description.toLowerCase().includes(searchKeyword);
            const matchesLocation = job.location.toLowerCase().includes(searchLocation);
            return matchesKeyword && matchesLocation;
        });
        displayResults(results);
    });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhuma vaga encontrada.</p>';
        return;
    }
    results.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job-listing');
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Empresa:</strong> ${job.company}</p>
            <p><strong>Localização:</strong> ${job.location}</p>
            <p><strong>Descrição:</strong> ${job.description}</p>
            <p><strong>Salário:</strong> ${job.salary}</p>
        `;
        resultsContainer.appendChild(jobElement);
    });
}