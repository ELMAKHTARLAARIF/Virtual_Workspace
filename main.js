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
                DetailsModal.classList.add("is_hidden")
            default:
                modalAjouteContent.classList.add("is_hidden")
                expForm.innerHTML = ""
                break;
        }
    })
})

// ajoutte employee
let id = JSON.parse(localStorage.getItem("id")) || 0;
const form = document.getElementById("workerInputs");
const inputs = document.querySelectorAll(".input");
const SubmitBtn = document.getElementById("submit");
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

    const errorName = document.querySelector(".error-Name");

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

        addexperience(id);

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

// add experience 

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
    // Asexp++;
});
// localStorage.clear();
function addexperience(id) {
 
        let validExp = true;
        const ExpError = document.querySelector(".errorexp");
        // all company input in add experience formula
        const company = document.querySelectorAll('input[name="Companyinput"]')
        const expRole = document.querySelectorAll('input[name="expRoleinput"]');
        const From = document.querySelectorAll('input[name="Frominput"]');
        const To = document.querySelectorAll('input[name="ToInput"]');
        console.log(company)
        console.log(expRole)
   for (let i = 0; i < company.length; i++) {
        if (!(company[i].value.trim() || expRole[i].value.trim() || From[i].value.trim() || To[i].value.trim())) {
            ExpError.classList.remove("is_hidden");
            ExpError.textContent = "enter valid information!";
            validExp = false;
        }
        else {
            ExpError.classList.add("is_hidden");
            experience.push({
                company: company[i].value,
                rl: expRole[i].value,
                from: From[i].value,
                to: To[i].value
            });
            console.log(experience)
            Asexp = 0;
        }
    }

}

