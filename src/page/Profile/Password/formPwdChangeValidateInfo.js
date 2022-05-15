export default function formValidateInfo(values) {
    let errors = {}

    if (!values.currentPwd) {
        errors.currentPwd = 'You need to enter your password.'
        document.getElementsByName('currentPwd')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('newPwd')[0].style.borderColor = 'grey'
    }

    if (!values.newPwd) {
        errors.newPwd = 'You need to enter a new password.'
        document.getElementsByName('newPwd')[0].style.borderColor = 'red'
    } else if (values.newPwd.length < 8) {
        errors.newPwd = 'Your new password is too short.'
        document.getElementsByName('newPwd')[0].style.borderColor = 'red'
    } else if (values.newPwd === values.currentPwd) {
        errors.newPwd = 'New password should not be same as current password.'
        document.getElementsByName('newPwd')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('newPwd')[0].style.borderColor = 'grey'
    }

    if (!values.conNewPwd) {
        errors.conNewPwd = 'You need to confirm your new password.'
        document.getElementsByName('conNewPwd')[0].style.borderColor = 'red'
    } else if (values.conNewPwd !== values.newPwd) {
        errors.conNewPwd = "The password don't match."
        document.getElementsByName('conNewPwd')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('conNewPwd')[0].style.borderColor = 'grey'
    }

    return errors
}
