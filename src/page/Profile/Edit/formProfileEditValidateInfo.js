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

    if (!values.year || parseInt(values.year) < 1900 || !/^\d+$/.test(values.year)) {
        errors.year = 'Enter a valid year.'
        document.getElementsByName('year')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('year')[0].style.borderColor = 'grey'
    }

    return errors
}
