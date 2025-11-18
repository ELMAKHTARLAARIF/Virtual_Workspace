
const modalAjouteContent =document.getElementById("modal-content");
const btns=document.querySelectorAll(".btn");
const expForm=document.getElementById("exp_form");
console.log(btns)

btns.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        if(btn.dataset.action==="addworker"){
          modalAjouteContent.classList.remove("is_hidden")  
        }
        else if (btn.dataset.action ==="close-modal"){
            modalAjouteContent.classList.add("is_hidden") 
        }
        else{
            expForm.classList.remove("is_hidden")  
        }
    })
})
