let contactData = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cPassword: "",
    fbUrl: "",
    slug: "",
    textarea: "",
};

function handleInputChange(event) {
    let isValidate;
    let errorMsg;
    const lastChild = event.target.parentElement.lastElementChild;

    if (lastChild.classList.contains("error")) {
        lastChild.remove();
    }

    if (event.target.name === "name") {
        contactData.name = "";
        const re = /^[a-zA-Z\s]{3,}$/;
        errorMsg = "Minimum 3 Character. Allowed characters: letters and space only";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "username") {
        contactData.username = "";
        const re = /^[\w\.]{3,}$/;
        errorMsg = "Minimum 3 Character. Allowed characters: letter, number, underscore(_), dot(.) only";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "email") {
        contactData.email = "";
        const re = /^[\S]+@[\w]+.[\w]+$/;
        errorMsg = "Please provide Actual email format";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "phone") {
        contactData.phone = "";
        const re = /^\+?(88)?01[\d]{9}$/;
        errorMsg = "Only BD numbers available for now";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "password") {
        contactData.password = ""
        const re = /^(?=.*\d)(?=.*[a-zA-z])[\w\s!@#$%&]{6,}$/;
        errorMsg =
            "Password must contains a letter, a number & minimum 6 character or more. Allowed characters: uppercase, lowercase, number, space, !, @, #, $, %, &";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "cPassword") {
        contactData.cPassword = "";
        const re = /^(?=.*\d)(?=.*[a-zA-z])[\w\s!@#$%&]{6,}$/;
        errorMsg =
            "Password must contains a letter, a number & minimum 6 character or more. Allowed characters: uppercase, lowercase, number, space, !, @, #, $, %, &";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "fbUrl") {
        contactData.fbUrl = "";
        const re = /(http(s)?:\/\/)?(www.)?[a-zA-Z0-9@:%\._\+~#=]{2,}\.[a-z]{2,6}[a-zA-Z0-9@:%\-_\+\.~#?&//=]{0,}/gi;
        errorMsg = "Please provide a valid URL";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "slug") {
        contactData.slug = "";
        const re = /^[a-z0-9-]+$/gi;
        errorMsg = "Please provide a valid slug";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "textarea") {
        contactData.textarea = "";
        const re = /^[a-zA-Z0-9@:%\._\+~#=\s]{3,}$/;
        errorMsg = "Minimum 3 Character";
        isValidate = re.test(event.target.value);
    }

    if (isValidate) {
        contactData = { ...contactData, [event.target.name]: event.target.value };
    } else {
        form.showError(event.target, errorMsg);
    }
}

const form = {
    loadSelector() {
        const contactForm = document.querySelector("#contactForm");
        const alertToast = document.querySelector("#alertToast");
        const alertMsg = document.querySelector("#alertMsg");
        const nameEl = document.querySelector("#name");
        const usernameEl = document.querySelector("#username");
        const emailEl = document.querySelector("#email");
        const passwordEl = document.querySelector("#password");
        const cPasswordEl = document.querySelector("#cPassword");
        const textareaEl = document.querySelector("#textarea");
        const openEyeEls = document.querySelectorAll(".openEye");
        const closeEyeEls = document.querySelectorAll(".closeEye");
        const openEyeElsArr = Array.from(openEyeEls);
        const closeEyeElsArr = Array.from(closeEyeEls);

        return {
            contactForm,
            alertToast,
            alertMsg,
            nameEl,
            usernameEl,
            emailEl,
            passwordEl,
            cPasswordEl,
            openEyeElsArr,
            closeEyeElsArr,
            textareaEl,
        };
    },
    showError(el, msg) {
        let label = document.createElement("label");
        label.className = "error";
        label.innerHTML = msg;
        el.parentElement.insertAdjacentElement("beforeend", label);
    },
    showAlert(type, msg) {
        const { alertToast, alertMsg } = this.loadSelector();
        let icon;
        alertToast.className = `toast align-items-center bg-${type}`;
        if (type === "danger") {
            icon = `<i class="fas fa-times-circle"></i>`;
        } else {
            icon = `<i class="fas fa-check-circle"></i>`;
        }
        alertMsg.innerHTML = icon + " " + `<span>${msg}</span>`;

        const toast = new bootstrap.Toast(alertToast, {
            delay: 3500,
        });
        toast.show();
    },
    clearAllError() {
        const { nameEl, usernameEl, emailEl, passwordEl, cPasswordEl, textareaEl } = this.loadSelector();
        const elArr = [nameEl, usernameEl, emailEl, passwordEl, cPasswordEl, textareaEl];
        elArr.forEach(el => {
            if (el.nextElementSibling) {
                el.nextElementSibling.remove();
            }
        })
    },
    handleSubmit() {
        const { name, username, email, password, cPassword, textarea } = contactData;
        const { contactForm, nameEl, usernameEl, emailEl, passwordEl, cPasswordEl, textareaEl } = this.loadSelector();
        this.clearAllError();

        if (contactData) {
            if ((name, username, email, password, cPassword, textarea)) {
                if (password === cPassword) {
                    console.log(contactData);
                    this.showAlert("success", "You have successfully submit your data. Thank you.");
                    contactForm.reset();
                } else {
                    this.showAlert("danger", "Password and confirm password not matched");
                }
            } else {
                !name && this.showError(nameEl, "Full Name is required");
                !username && this.showError(usernameEl, "Username is required");
                !email && this.showError(emailEl, "Email is required");
                !password && this.showError(passwordEl, "Password is required");
                !cPassword && this.showError(cPasswordEl, "Confirm Password is required");
                !textarea && this.showError(textareaEl, "Message is required");

                this.showAlert("danger", "Please provide all required field");
            }
        }
    },
    showOrHidePassword(event) {
        let targetInput = event.target.parentElement.nextElementSibling;

        event.target.classList.add("d-none");
        if (event.target.classList.contains("openEye")) {
            event.target.nextElementSibling.classList.remove("d-none");
        } else {
            event.target.previousElementSibling.classList.remove("d-none");
        }

        if (targetInput.getAttribute("type") === "password") {
            targetInput.setAttribute("type", "text");
        } else {
            targetInput.setAttribute("type", "password");
        }
    },
    init() {
        const { contactForm, openEyeElsArr, closeEyeElsArr } = this.loadSelector();

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            form.handleSubmit();
        });

        openEyeElsArr.forEach((el) => {
            el.addEventListener("click", (e) => this.showOrHidePassword(e));
        });

        closeEyeElsArr.forEach((el) => {
            el.addEventListener("click", (e) => this.showOrHidePassword(e));
        });
    },
};

form.init();
