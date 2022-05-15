export default function formValidateInfo(values) {
    let errors = {}

    if (!values.name.trim()) {
        errors.name = 'Enter a name for your playlist.'
        document.getElementsByName('name')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('name')[0].style.borderColor = 'grey'
    }

    return errors
}
