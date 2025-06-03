// Array com as vagas em destaque
const jobListings = [
    {
        id: 'dev-frontend-react',
        title: "Desenvolvedor Frontend React",
        company: "Tech Solutions",
        location: "São Paulo, SP",
        type: "CLT",
        salary: "R$ 5.000 - R$ 8.000",
        description: "Desenvolvimento de interfaces web modernas usando React, TypeScript e Material-UI.",
        requirements: [
            "React.js e TypeScript",
            "HTML5, CSS3, JavaScript",
            "Git e metodologias ágeis",
            "1+ ano de experiência"
        ],
        benefits: [
            "Vale Refeição/Alimentação",
            "Plano de Saúde",
            "Gym Pass",
            "Day Off no aniversário"
        ]
    },
    {
        id: 'analista-marketing',
        title: "Analista de Marketing Digital",
        company: "Marketing Pro",
        location: "Remoto",
        type: "PJ",
        salary: "R$ 4.500 - R$ 6.500",
        description: "Gestão de campanhas digitais, análise de métricas e estratégias de crescimento.",
        requirements: [
            "Google Analytics e Meta Ads",
            "SEO e Marketing de Conteúdo",
            "Excel avançado",
            "2+ anos de experiência"
        ],
        benefits: [
            "Trabalho 100% remoto",
            "Horário flexível",
            "Auxílio home office",
            "Cursos e certificações"
        ]
    },
    {
        id: 'aux-administrativo',
        title: "Auxiliar Administrativo",
        company: "Grupo Empresarial Brasil",
        location: "Rio de Janeiro, RJ",
        type: "CLT",
        salary: "R$ 2.200 - R$ 2.800",
        description: "Suporte administrativo, organização de documentos e atendimento.",
        requirements: [
            "Pacote Office",
            "Boa comunicação",
            "Ensino médio completo",
            "Experiência anterior desejável"
        ],
        benefits: [
            "Vale Transporte",
            "Vale Refeição",
            "Plano de Saúde",
            "Seguro de Vida"
        ]
    },
    {
        id: 'estagio-ti',
        title: "Estágio em TI",
        company: "InnovaTech",
        location: "Curitiba, PR",
        type: "Estágio",
        salary: "R$ 1.800 - R$ 2.000",
        description: "Suporte em projetos de desenvolvimento e infraestrutura de TI.",
        requirements: [
            "Cursando TI ou áreas relacionadas",
            "Conhecimento básico em programação",
            "Inglês intermediário",
            "Disponibilidade para 6h diárias"
        ],
        benefits: [
            "Vale Transporte",
            "Vale Refeição",
            "Curso de Inglês",
            "Possibilidade de efetivação"
        ]
    }
];

// Função para exibir as vagas em destaque
function displayFeaturedJobs() {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    jobsList.innerHTML = jobListings.map(job => `
        <div class="job-card" data-job-id="${job.id}">
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <span class="job-type">${job.type}</span>
            </div>
            <div class="job-company">
                <strong>${job.company}</strong>
                <span class="job-location">📍 ${job.location}</span>
            </div>
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
            <button class="apply-btn" onclick="applyForJob('${job.id}')">Candidatar-se</button>
        </div>
    `).join('');
}

// Função para candidatar-se à vaga
function applyForJob(jobId) {
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    
    if (!isLoggedIn) {
        // Se não estiver logado, redirecionar para a página de login
        localStorage.setItem('lastJobId', jobId); // Salvar a vaga para retornar depois
        window.location.href = 'login.html';
        return;
    }

    // Se estiver logado, redirecionar para a página da vaga
    window.location.href = `vaga.html?id=${jobId}`;
}

// Função para pesquisar vagas
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    const location = document.getElementById('search-location').value.toLowerCase();

    const filteredJobs = jobListings.filter(job => {
        const matchesKeyword = 
            job.title.toLowerCase().includes(keyword) || 
            job.description.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword);
        const matchesLocation = 
            job.location.toLowerCase().includes(location) ||
            (location === '' && job.location === 'Remoto');
        
        return matchesKeyword && (location === '' || matchesLocation);
    });

    displaySearchResults(filteredJobs);
});

// Função para exibir resultados da busca
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>Nenhuma vaga encontrada</h3>
                <p>Tente outros termos ou localização</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = results.map(job => `
        <div class="job-card search-result">
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <span class="job-type">${job.type}</span>
            </div>
            <div class="job-company">
                <strong>${job.company}</strong>
                <span class="job-location">📍 ${job.location}</span>
            </div>
            <div class="job-salary">
                <i class="salary-icon">💰</i> ${job.salary}
            </div>
            <div class="job-description">
                ${job.description}
            </div>
            <button class="apply-btn">Candidatar-se</button>
        </div>
    `).join('');
}

// Carregar vagas em destaque quando a página carregar
document.addEventListener('DOMContentLoaded', displayFeaturedJobs);

// Banners rotativos para o topo
const banners = [
    'Sua nova oportunidade está a um clique! <b>Cadastre-se</b> e encontre o emprego ideal.',
    '💡 Atualize seu currículo e aumente suas chances de ser contratado!',
    '🌎 Vagas para todo o Brasil e também para trabalho remoto.',
    '🚀 Cadastre-se para receber vagas no seu e-mail!',
    '👔 Empresas de destaque estão procurando por você!'
];

let bannerIndex = 0;
const bannerText = document.getElementById('bannerText');

function rotateBanner() {
    if (!bannerText) return;
    bannerText.style.opacity = 0;
    setTimeout(() => {
        bannerIndex = (bannerIndex + 1) % banners.length;
        bannerText.innerHTML = banners[bannerIndex];
        bannerText.style.opacity = 1;
    }, 500);
}

if (bannerText) {
    setInterval(rotateBanner, 4000);
}