// Sample job data - In a real application, this would come from an API
const jobs = [
    {
        title: 'Desenvolvedor Frontend',
        company: 'Tech Solutions',
        location: 'São Paulo, SP',
        salary: 'R$ 5.000 - R$ 7.000',
        description: 'Desenvolvimento de interfaces modernas com React'
    },
    {
        title: 'Desenvolvedor Backend',
        company: 'Digital Systems',
        location: 'Rio de Janeiro, RJ',
        salary: 'R$ 6.000 - R$ 8.000',
        description: 'Desenvolvimento de APIs com Node.js'
    },
    {
        title: 'UX Designer',
        company: 'Creative Agency',
        location: 'Curitiba, PR',
        salary: 'R$ 4.500 - R$ 6.500',
        description: 'Criação de experiências digitais inovadoras'
    }
];

// Function to create job cards
function createJobCard(job) {
    return `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p class="location">${job.location}</p>
            <p class="salary">${job.salary}</p>
            <p>${job.description}</p>
        </div>
    `;
}

// Function to display jobs
function displayJobs(jobsToShow) {
    const jobsList = document.getElementById('jobsList');
    jobsList.innerHTML = jobsToShow.map(job => createJobCard(job)).join('');
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
    const locationTerm = document.getElementById('locationSearch').value.toLowerCase();

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                            job.description.toLowerCase().includes(searchTerm);
        const matchesLocation = job.location.toLowerCase().includes(locationTerm);
        return matchesSearch && (locationTerm === '' || matchesLocation);
    });

    displayJobs(filteredJobs);
});

// Navigation buttons
document.getElementById('loginBtn').addEventListener('click', () => {
    window.location.href = 'login.html';
});

document.getElementById('cadastroBtn').addEventListener('click', () => {
    window.location.href = 'cadastro.html';
});

// Initial display of all jobs
window.onload = () => displayJobs(jobs);