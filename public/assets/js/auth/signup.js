const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
const phoneCheck = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

document.getElementById("password").addEventListener("change", () => {
    document.getElementById("password").classList.remove("error")
    document.getElementById("confirm-password").classList.remove("error")
    document.querySelectorAll('.errorMessageHelperPassword').forEach(e => e.remove());
})
document.getElementById("confirm-password").addEventListener("change", () => {
    document.getElementById("password").classList.remove("error")
    document.getElementById("confirm-password").classList.remove("error")
    document.querySelectorAll('.errorMessageHelperPassword').forEach(e => e.remove());

})
document.getElementById("phoneNo").addEventListener("change", () => {
    document.getElementById("phoneNo").classList.remove("error")
    document.querySelectorAll('.errorMessageHelperPhoneNo').forEach(e => e.remove());
})

const formSubmit = (e) => {
    let formData = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        gender: e.target.gender.value,
        dateOfBirth: e.target.dateOfBirth.value,
        password: e.target.password.value,
        newPassword: e.target['confirm-password'].value,
        email: e.target.email.value,
        phoneNo: e.target.phoneNo.value
    }
    if (formData.firstName && formData.lastName && formData.gender && formData.dateOfBirth && formData.password && formData.newPassword && formData.email) {
        let span = document.createElement("span");
        if (passwordCheck.test(formData.password)) {
            span.classList.add("errorMessageHelperPassword")
            if (formData.password !== formData.newPassword) {
                span.innerHTML = "Password mismatch"

                document.getElementById("password").classList.add("error")

                document.getElementById("password").parentNode.appendChild(span)
                document.getElementById("confirm-password").classList.add("error")
                document.getElementById("confirm-password").parentNode.appendChild(span)
                e.preventDefault();

            }
        } else {
            span.classList.add("errorMessageHelperPassword")
            span.innerHTML = "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase"
            document.getElementById("password").classList.add("error")
            document.getElementById("password").parentNode.appendChild(span)
            document.getElementById("confirm-password").classList.add("error")
            document.getElementById("confirm-password").parentNode.appendChild(span)
            e.preventDefault();

        }
        if (!phoneCheck.test(formData.phoneNo)) {
            span.classList.add("errorMessageHelperPhoneNo")
            span.innerHTML = "Please enter a valid phone number"
            document.getElementById("phoneNo").classList.add("error")
            document.getElementById("phoneNo").parentNode.appendChild(span)
            e.preventDefault();


        }

    }

}

document.addEventListener("submit", formSubmit);
