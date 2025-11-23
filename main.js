let workers = [];
let experience = [];

const modalAjouteContent = document.getElementById("modal-content");
const btns = document.querySelectorAll(".btn");
const expForm = document.getElementById("exp_form");
const DetailsModal = document.getElementById("DetailsModal");

// gerer buttons 
btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        switch (btn.dataset.action) {
            case "addworker":
                modalAjouteContent.classList.remove("is_hidden")
                break;
            case "closeDetailsModal":
                DetailsModal.classList.add("is_hidden");
                document.querySelector(".section-hero").classList.remove("backdrop");
                break;
            default:
                modalAjouteContent.classList.add("is_hidden")
                expForm.innerHTML = ""
                break;
        }
    })
})

// ajoutte employee
let id = JSON.parse(localStorage.getItem("id")) || 1;
const form = document.getElementById("workerInputs");
const inputs = document.querySelectorAll(".input");
const SubmitBtn = document.getElementById("submit");
const errorName = document.querySelector(".error-Name");
const emailPhoneForm = document.getElementById("email-phone-form");
let Asexp;
SubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    Asexp = 0;
    let valid = true;

    const name = inputs[0].value.trim();
    const role = inputs[1].value.trim();
    const url = inputs[2].value.trim();
    const email = inputs[3].value.trim();
    const phone = inputs[4].value.trim();


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const urlRegex = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    const phoneRegex = /^(05|06|07)\d{8}$|^(\+212)\d{9}$/;

    if ((!name)) {
        errorName.classList.remove("is_hidden");
        errorName.textContent = "enter a valid Name!!!";
        inputs[0].style.border = "1px solid red";
        valid = false;
    }
    if (!(urlRegex.test(url))) {
        errorName.classList.remove("is_hidden");
        errorName.textContent = "enter a valid url !!!";
        inputs[2].style.border = "1px solid red";
        valid = false;
    }
    if (!(emailRegex).test(email)) {
        errorName.classList.remove("is_hidden")
        errorName.textContent = "Enter a valid Email !!!";
        inputs[3].style.border = "1px solid red";
        valid = false;
    }
    if ((!phoneRegex.test(phone))) {
        errorName.classList.remove("is_hidden");
        errorName.textContent = "Enter a valid Number phone !!!";
        inputs[4].style.border = "1px solid red";
        valid = false;
    }

    if (valid) {

        const expValid = addexperience();
        if (!expValid) return;

        workers.push({
            id: id++,
            name: name,
            role: role,
            url: url,
            email: email,
            phone: phone,
            experience: [...experience]
        });
        console.log(workers)
        errorName.classList.add("is_hidden");
        errorName.textContent = "";
        inputs.forEach(inp => inp.style.border = ".1px solid rgb(184, 180, 180)");
        localStorage.setItem("id", (id))
        localStorage.setItem("worker", JSON.stringify(workers));
        showProfileData(id);

        // form.reset();
        // emailPhoneForm.reset();
        expForm.classList.add("is_hidden");
        expForm.innerHTML = "";
    }
});


const addExpBtn = document.getElementById("addExpBtn");
// Add experience 
addExpBtn.addEventListener("click", () => {
    expForm.classList.remove("is_hidden");
    expForm.insertAdjacentHTML("beforeend", `
        <h4>Experience :</h4>
        <div class="experience-form-Content">
            <div class="errorexp is_hidden"></div>
            <label>Company:</label>
            <input type="text" name="Companyinput">
            <label>role:</label>
            <input type="text" name="expRoleinput">
            <label>From:</label>
            <input type="date" name="Frominput">
            <label>To:</label>
            <input type="date" name="ToInput">
        </div>
    `);
});
// localStorage.clear();
function addexperience() {

    let validExp = true;
    const ExpError = document.querySelectorAll(".errorexp");
    const company = document.querySelectorAll('input[name="Companyinput"]');
    const expRole = document.querySelectorAll('input[name="expRoleinput"]');
    const From = document.querySelectorAll('input[name="Frominput"]');
    const To = document.querySelectorAll('input[name="ToInput"]');
    for (let i = 0; i < company.length; i++) {
        if (!(company[i].value.trim() && expRole[i].value.trim() && From[i].value.trim() && To[i].value.trim())) {
            ExpError[i].classList.remove("is_hidden");
            ExpError[i].textContent = "enter valid information!";
            validExp = false;
        } else {
            console.log("hi")
            ExpError[i].classList.add("is_hidden");
            experience.push({
                company: company[i].value,
                rl: expRole[i].value,
                from: From[i].value,
                to: To[i].value
            });
        }
    }
    return validExp;
}

//show employee Profil
const cards = document.getElementById("cards");
function showProfileData() {
    // id = JSON.parse(localStorage.getItem("id"));
    cards.innerHTML = "";
    workers = JSON.parse(localStorage.getItem("worker")) || [];
    console.log(workers)
    workers.forEach((worker, index) => {
        cards.insertAdjacentHTML("beforeend", `
                     <div class="profil-personnel">
                     <img src="${worker.url}" alt="photo profile" onclick="ShowDetails(${worker.id})">
                    <h4>${worker.name}</h4>
                    <p>Edit</p>
                    <span class="experience-company-name">${worker.role}</span>
                    
                </div>
        `);
    })
}
showProfileData()


// show Details Modal
function ShowDetails(id) {
    DetailsModal.classList.remove("is_hidden")
    document.querySelector(".section-hero").classList.add("backdrop");
    workers = JSON.parse(localStorage.getItem("worker")) || [];
    const workerInfoDetail = document.querySelector(".worker-info-detail");
    const workerImageDetail = document.querySelector(".worker-image-detail");
    const workerExperienceDetail = document.getElementById("workerExperienceDetail");
    const worker = workers.find(w => w.id == id);
    console.log(worker)
    workerInfoDetail.innerHTML = `
                        <h3 id="workerNameDetail">Name: ${worker.name}</h3>
                    <p id="workerRoleDetail">Role: ${worker.role}</p>
                    <p id="workerEmailDetail">Email: ${worker.email}</p>
                    <p id="workerPhoneDetail">Phone: ${worker.phone}</p>
    `
    workerImageDetail.innerHTML = `
                        <img src="${worker.url}" alt="worker image" id="workerImageDetail">
                        `
    workerExperienceDetail.innerHTML = "<h4>Experience:</h4>";
    worker.experience.forEach(exp => {
        workerExperienceDetail.innerHTML += `
        <div>
        <p>Company : ${exp.company}</p>
        <p>role : ${exp.rl}</p>
        <p>From : ${exp.from}</p>
        <p>To : ${exp.to}</p>
        </div>
        `
    })
}
const choseEmployeeBtn = document.querySelectorAll(".chose-employee-btn");
const SelectProfile = document.getElementById("Select-profile");
// let currentZone = null;
let selectedWorker = [];

choseEmployeeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        HandeleAsignedWorkers(e);

    });
});
let found;
let currentZone;
function HandeleAsignedWorkers(e) {
    found = false;
    if (!e) return;
    const selectedDiv = e.target.closest(".selected");
    currentZone = selectedDiv.querySelector(".zones");

    workers = JSON.parse(localStorage.getItem("worker"));
    const ZoneAction = currentZone.dataset.action;

    SelectProfile.innerHTML = `
        <div class="side-bare-title">
            <h3 id = "full">Those authorized to join</h3>
            <button class="close-chose-worker">X</button>
        </div>
    `;

    for (let i = 0; i < workers.length; i++) {
        switch (ZoneAction) {
            case "conference":
                DisplayProfile(i);
                break;
            case "Réceptionnistes":
                if (workers[i].role !== "Autres rôles" && workers[i].role !== "sécurité" && workers[i].role !== "Techniciens IT" )
                    DisplayProfile(i)
                break;
            case "Techniciens IT":
                if (workers[i].role !== "Autres rôles" && workers[i].role !== "Réceptionnistes" && workers[i].role !== "sécurité")
                    DisplayProfile(i)
                break;
            case "sécurité":
                if (workers[i].role !== "Autres rôles" && workers[i].role !== "Réceptionnistes" && workers[i].role !== "Techniciens IT")
                    DisplayProfile(i)
                break;
            case "sttaf":
                DisplayProfile(i);
                break;
            case "Autres":
                if (workers[i].role !== "Nettoyage")
                    DisplayProfile(i);
                break;
            default:
                break;
        };

    }
    if (!found) {
        SelectProfile.innerHTML = `
                    <div class="side-bare-title">
                        <h3>Aucun employee !!</h3>
                        <button class="close-chose-worker">X</button>
                    </div>
    `;

    }
    //close the modal of workers 
    const closeChoseWorker = document.querySelector(".close-chose-worker");
    closeChoseWorker.addEventListener("click", () => {
        SelectProfile.classList.add("is_hidden")
    });
    SelectProfile.classList.remove("is_hidden");
}

// display all profile 3la 7ssab les conditions 
function DisplayProfile(i) {
    SelectProfile.insertAdjacentHTML("beforeend", `
                <div class="profil-personnel" id="worker-${i}">
                    <img src="${workers[i].url}" alt="photo profile">
                    <h4>${workers[i].name}</h4>
                    <p class="selectBtn" onclick="selectedProfile(this, ${workers[i].id})">Select</p>
                    <span class="experience-company-name">${workers[i].role}</span>
                </div>
            `);
    found = true;
}
//selected worker profile

function selectedProfile(ele, workerIndex) {

    let indexx = workers.indexOf(workers.find(worker => worker.id == workerIndex))
    workers = JSON.parse(localStorage.getItem("worker")) || [];
    const slectedZone = currentZone.dataset.action;

    workers = JSON.parse(localStorage.getItem("worker"));
    if (currentZone.children.length <= 3 && slectedZone !== "Réceptionnistes") {

        GotZone(ele, indexx);
    }
    else if (currentZone.children.length <= 6 && slectedZone === "Réceptionnistes") {
        GotZone(ele, indexx);
    }
    else {
        const full = document.querySelector("#full");
        full.textContent = "Room is Full";
        full.style.backgroundColor = "red"
    }

    showProfileData();
    ChangeColorBtn();
}

function GotZone(ele, workerIndex) {
    currentZone.insertAdjacentHTML("beforeend", `
            <div class="employee-conference-room">
                <img src="${workers[workerIndex].url}" alt="photo profile">
                <h4>${workers[workerIndex].name}</h4>
                <p>${workers[workerIndex].role}</p>
                <button class="removeworker" onclick="ReturnTAsignedWorker(this,${workerIndex})">x</button>
            </div>
        `);
    ele.parentElement.outerHTML = "";
    selectedWorker = workers.splice(workerIndex, 1)[0];
    localStorage.setItem("worker", JSON.stringify(workers));
}

function ChangeColorBtn() {
    const cheldOfzones = document.querySelectorAll(".zones");
    cheldOfzones.forEach(cheld => {
        if (cheld.children.length == 0)
            cheld.nextElementSibling.style.backgroundColor = "red";
        else
            cheld.nextElementSibling.style.backgroundColor = "blue";
    })

}
ChangeColorBtn();

function ReturnTAsignedWorker(element, elementIndex) {
    console.log("hello", elementIndex)
    element.parentElement.outerHTML = "";
    workers.push(selectedWorker);
    localStorage.setItem("worker", JSON.stringify(workers));
    workers.forEach((worker) => {
        if (worker.id === selectedWorker.id) {
            SelectProfile.insertAdjacentHTML("beforeend", `
                <div class="profil-personnel" id="worker-${worker.id}">
                    <img src="${worker.url}" alt="photo profile">
                    <h4>${worker.name}</h4>
                    <p class="selectBtn" onclick="selectedProfile(this, ${worker.id})">Select</p>
                    <span class="experience-company-name">${worker.role}</span>
                </div>
            `);
        }
    })
ChangeColorBtn();
    showProfileData();

}