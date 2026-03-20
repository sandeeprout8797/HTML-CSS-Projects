let jobParentArray = JSON.parse(localStorage.getItem("jobs")) || [[]]

let currentPage = 0
let display = document.querySelector(".jobDisplay")

class JobCard{

    constructor(title,location){
    this.title = title
    this.location = location
    }

}

function saveJobs(){
    localStorage.setItem("jobs",JSON.stringify(jobParentArray))
}

function addJob(event){

    event.preventDefault()

    const title=document.querySelector(".title").value
    const jobLocation=document.querySelector(".location").value

    const job=new JobCard(title,jobLocation)

    if(jobParentArray[0].length<10){

    jobParentArray[0].unshift(job)

    }else{

    jobParentArray.unshift([job])
    currentPage=0

    }

    saveJobs()
    renderJobs()

}


function renderJobs(){

    display.innerHTML=""

    let search=document.getElementById("searchBox").value.toLowerCase()

    jobParentArray[currentPage].forEach((job,index)=>{

    if(
        job.title.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search)
    ){

        display.innerHTML+=`
        <div class="jobItem">
        Job ${index+1}: <b>${job.title}</b> - ${job.location}
        </div>
        `

    }

    })

    updatePageNumber()

}


function nextPage(){

    if(currentPage<jobParentArray.length-1){

    currentPage++
    renderJobs()

}

}

function prevPage(){

    if(currentPage>0){

    currentPage--
    renderJobs()

    }

}


function updatePageNumber(){

    document.getElementById("pageNumber").innerText =
    (currentPage+1) + " / " + jobParentArray.length

}


function searchJobs(){

    let query=document.getElementById("searchBox").value.toLowerCase()

    display.innerHTML=""

    if(query===""){
        renderJobs()
        return
    }

    jobParentArray.forEach((page,pageIndex)=>{

        page.forEach((job,index)=>{

            if(job.title.toLowerCase().includes(query) ||job.location.toLowerCase().includes(query)) {

                display.innerHTML+=`
                <div class="jobItem">
                Page ${pageIndex+1} - Job ${index+1}: <b>${job.title}</b> - ${job.location}
                </div>
                `

    }

    })

    })

    document.getElementById("pageNumber").innerText="Search Results"

}


function editJob(){

    let page=document.getElementById("editPage").value
    let jobIndex=document.getElementById("editJob").value

    let newTitle=document.getElementById("editTitle").value
    let newLocation=document.getElementById("editLocation").value

    page=parseInt(page)-1
    jobIndex=parseInt(jobIndex)-1

    if(jobParentArray[page] && jobParentArray[page][jobIndex]){

        jobParentArray[page][jobIndex].title=newTitle
        jobParentArray[page][jobIndex].location=newLocation

        saveJobs()
        alert("Job Updated")
        renderJobs()

    } else{
        alert("Invalid Page or Job Number")
    }

}


function deleteJob(){

    let page=document.getElementById("editPage").value
    let jobIndex=document.getElementById("editJob").value

    page=parseInt(page)-1
    jobIndex=parseInt(jobIndex)-1

    if(jobParentArray[page] && jobParentArray[page][jobIndex]){

        jobParentArray[page].splice(jobIndex,1)

        saveJobs()

        alert("Job Deleted")

        renderJobs()

    }else{

        alert("Invalid Page or Job Number")

    }

}

function deleteAllJobs(){

    if(confirm("Are you sure you want to delete ALL jobs?")){

    jobParentArray=[[]]

    localStorage.clear()

    currentPage=0

    renderJobs()

    alert("All jobs deleted")

    }

}


renderJobs()