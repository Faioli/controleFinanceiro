const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordRequiredError: () => document.getElementById('confirm-password-required-error'),
    passwordDosentMatchError: () => document.getElementById('password-doesnt-match-error'),
    registerButton: () => document.getElementById('register-button')
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../home/index.html";
    }
})

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();

    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordRequiredError().style.display = confirmPassword ? "none" : "block";

    validatePasswordsMatch();

    toggleRegisterButtonDisable();
}

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        console.log("Esconde")
        hideLoading();
        window.location.href = "../../pages/home/index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já cadastrado";
    }
    return error.message;
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.passwordDosentMatchError().style.display = password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    const formValid = isFormValid();
    form.registerButton().disabled = !formValid;
}

function isFormValid() {
    const email = form.email().value;
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    if (!email || !validateEmail(email)) {
        return false;
    }

    if (!password || password.length < 6) {
        return false;
    }

    if (password != confirmPassword) {
        return false;
        }

    return true;
}
