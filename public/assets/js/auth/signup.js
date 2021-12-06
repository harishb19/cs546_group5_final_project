const formSubmit = (e) => {
    e.preventDefault();
    let gender = e.target.gender.value
    let dateOfBirth= e.target.dateOfBirth.value
    let password= e.target.password.value
    let newPassword=e.target.confirm-password.value
    let email=e.target.email.value

}

document.addEventListener("submit", formSubmit);
