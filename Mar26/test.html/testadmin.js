let parentJobMainPageArray = [];
let childJobPageArray = [];
let currentPageIndex = 0;

let currentPage = 0
let display = document.querySelector(".jobsDisplayMainDivision")

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);

function saveJobs() { 
    localStorage.setItem("jobs", JSON.stringify(jobParentArray))
}

class jobCard {
    constructor(title, location, jobType, salary, jobDate) {
        this.title = title;
        this.location = location;
        this.jobType = jobType;
        this.salary = salary;
        this.jobDate = jobDate;
    }
}

function addJob(event) {
    event.preventDefault();

    const title = document.querySelector(".jobTitle").value;
    const location = document.querySelector(".jobLocation").value;
    const jobType = document.querySelector(".jobType").value;
    const salary = document.querySelector(".jobSalary").value;
    const jobDate = document.querySelector(".jobDateInput").value;

    const job = new jobCard(title, location, jobType, salary, jobDate)
    
    if (jobParentArray[0].length<10) {
        jobParentArray[0].unshift(job)
    } else {
        jobParentArray.unshift([job])
        currentPage = 0
    }

    saveJobs();
    renderJobs();
    displayJobs();
}

function renderJobs() {

    const display = document.querySelector(".jobsDisplayMainDIvision")
    display.innerHTML = "";

    const container = document.querySelector(".jobsDisplayMainDivision");
    container.innerHTML = "";

    const allPages = getAllPages();
    const pageToShow = allPages[currentPageIndex] || [];

    if (pageToShow.length === 0) {
        container.innerHTML = "<p>No jobs available</p>";
        return;
    }

    pageToShow.forEach((job) => {
        container.innerHTML += `
            <div class="jobCard">
                <h3>${job.title}</h3>
                <p>📍 ${job.location}</p>
                <p>💼 ${job.jobType}</p>
                <p>💰 ${job.salary}</p>
                <p>📅 ${job.jobDate}</p>
            </div>
        `;
    });

    renderPageNumbers();
    updateButtons();
}

// ===================== NEXT =====================
function nextPage() {
    const allPages = getAllPages();

    if (currentPageIndex < allPages.length - 1) {
        currentPageIndex++;
        displayJobs();
    }
}

// ===================== PREV =====================
function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        displayJobs();
    }
}

// ===================== PAGE NUMBERS =====================
function renderPageNumbers() {
    const container = document.querySelector(".pageNumberDivision");
    container.innerHTML = "";

    const allPages = getAllPages();

    allPages.forEach((_, index) => {
        const btn = document.createElement("button");

        btn.innerText = index + 1;

        if (index === currentPageIndex) {
            btn.style.background = "black";
            btn.style.color = "white";
        }

        btn.addEventListener("click", () => {
            currentPageIndex = index;
            displayJobs();
        });

        container.appendChild(btn);
    });
}

// ===================== DISABLE BUTTONS =====================
function updateButtons() {
    const allPages = getAllPages();

    prevBtn.disabled = currentPageIndex === 0;
    nextBtn.disabled = currentPageIndex >= allPages.length - 1;
}