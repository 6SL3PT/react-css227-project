export default function formValidateInfo(values) {
    let errors = {}

    if (!values.name) {
        errors.name = 'You need to enter playlist name.'
        document.getElementsByName('name')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('name')[0].style.borderColor = 'grey'
    }

    return errors
}
