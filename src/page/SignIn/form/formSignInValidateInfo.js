export default function formValidateInfo(values) {
    let errors = {}

    if (!values.email) {
        errors.email = 'email error'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'email error'
    }

    if (!values.pwd) {
        errors.pwd = 'pwd error'
    } else if (values.pwd.length < 8) {
        errors.pwd = 'pwd error'
    }

    return errors
}
