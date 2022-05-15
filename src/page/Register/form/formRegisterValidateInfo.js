export default function formValidateInfo(values) {
    let errors = {}

    if (!values.email) {
        errors.email = 'You need to enter your email.'
        document.getElementsByName('email')[0].style.borderColor = 'red'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "This email is invalid. Make sure it's written like example@email.com"
        document.getElementsByName('email')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('email')[0].style.borderColor = 'grey'
    }

    if (!values.conEmail) {
        errors.conEmail = 'You need to confirm your email.'
        document.getElementsByName('conEmail')[0].style.borderColor = 'red'
    } else if (values.conEmail !== values.email) {
        errors.conEmail = "The email addresses don't match."
        document.getElementsByName('conEmail')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('conEmail')[0].style.borderColor = 'grey'
    }

    if (!values.pwd) {
        errors.pwd = 'You need to enter a password.'
        document.getElementsByName('pwd')[0].style.borderColor = 'red'
    } else if (values.pwd.length < 8) {
        errors.pwd = 'Your password is too short.'
        document.getElementsByName('pwd')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('pwd')[0].style.borderColor = 'grey'
    }

    if (!values.username.trim()) {
        errors.username = 'Enter a name for your profile.'
        document.getElementsByName('username')[0].style.borderColor = 'red'
    } else if (values.username.length > 20) {
        errors.username = 'Your username is too long, only 20 letters is allowed.'
        document.getElementsByName('username')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('username')[0].style.borderColor = 'grey'
    }

    if (
        !values.date ||
        parseInt(values.date) > 31 ||
        parseInt(values.date) <= 0 ||
        !/^\d+$/.test(values.date)
    ) {
        errors.date = 'Enter a valid day of month.'
        document.getElementsByName('date')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('date')[0].style.borderColor = 'grey'
    }

    if (!values.month) {
        errors.month = 'Select your birth month.'
        document.getElementsByName('month')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('month')[0].style.borderColor = 'grey'
    }

    if (
        !values.year ||
        parseInt(values.year) < 1900 ||
        !/^\d+$/.test(values.year) ||
        parseInt(values.year) > new Date().getFullYear()
    ) {
        errors.year = 'Enter a valid year.'
        document.getElementsByName('year')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('year')[0].style.borderColor = 'grey'
    }

    if (!values.gender) {
        errors.gender = 'Select your gender.'
    }

    return errors
}
