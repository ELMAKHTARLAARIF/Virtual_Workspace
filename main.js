let workers = [];
let workerExprerience = [];
const modalAjouteContent = document.getElementById("modal-content");
const btns = document.querySelectorAll(".btn");
const expForm = document.getElementById("exp_form");
console.log(btns)
// gerer buttons 
btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        switch (btn.dataset.action) {
            case "addworker":
                modalAjouteContent.classList.remove("is_hidden")
                break;
            default:
                modalAjouteContent.classList.add("is_hidden")
                break;
        }
    })
})
// ajoutte employee
const form = document.getElementById("workerInputs");
const inputs = document.querySelectorAll(".input");
const SubmitBtn = document.getElementById("submit");
const emailPhoneForm=document.getElementById("email-phone-form")
console.log(SubmitBtn)
SubmitBtn.addEventListener("click", (e) => {

    e.preventDefault();
    console.log("hello")
    let valid = true
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
        errorName.classList.remove("is_hidden")
        errorName.textContent = "enter a valid Name!!!";
        inputs[0].style.border = "1px solid red"
        valid = false;
    }
    if (!(urlRegex.test(url))) {
        errorName.classList.remove("is_hidden")
        errorName.textContent = "enter a valid url !!!";
        inputs[2].style.border = "1px solid red"
        valid = false;
    }
    if (!(emailRegex).test(email)) {
        errorName.classList.remove("is_hidden")
        errorName.textContent = "Anter a valid Email !!!";
        inputs[3].style.border = "1px solid red"
        valid = false;
    }
    if ((!phoneRegex.test(phone))) {
        errorName.classList.remove("is_hidden")
        errorName.textContent = "Enter a valid Number phone !!!";
        inputs[4].style.border = "1px solid red"
        valid = false;
    }
    if (valid) {
        // workers=JSON.parse(localStorage.getItem("worker"))||[];
        console.log("world");
        workers.push(
            {
                name: name,
                role: role,
                url: url,
                email: email,
                phone: phone,
            }
        )
        errorName.classList.add("is_hidden")
        errorName.textContent = "";
        inputs[0].style.border = ".1px solid rgb(184, 180, 180)"
        inputs[1].style.border = ".1px solid rgb(184, 180, 180)"
        inputs[2].style.border = ".1px solid rgb(184, 180, 180)"
        inputs[3].style.border = ".1px solid rgb(184, 180, 180)"
        inputs[4].style.border = ".1px solid rgb(184, 180, 180)"
        localStorage.setItem("worker", JSON.stringify(workers));
        showProfileData();
        form.reset();
        emailPhoneForm.reset();
    }

})
