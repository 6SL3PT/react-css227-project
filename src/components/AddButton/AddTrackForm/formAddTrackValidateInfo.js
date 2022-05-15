export default function formValidateInfo(values) {
    let errors = {}

    if (!values.name) {
        errors.name = 'You need to enter track name.'
        document.getElementsByName('name')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('name')[0].style.borderColor = 'grey'
    }

    if (!values.artist) {
        errors.artist = 'You need to enter an artist.'
        document.getElementsByName('artist')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('artist')[0].style.borderColor = 'grey'
    }

    if (!values.genre) {
        errors.genre = 'You need to enter a genre.'
        document.getElementsByName('genre')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('genre')[0].style.borderColor = 'grey'
    }

    if (!values.img) {
        errors.img = 'You need to add an image URL.'
        document.getElementsByName('img')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('img')[0].style.borderColor = 'grey'
    }

    if (!values.track) {
        errors.track = 'You need to add an track URL.'
        document.getElementsByName('track')[0].style.borderColor = 'red'
    } else if (values.duration === 0) {
        errors.track = 'Track URL seems to be invalid.'
        document.getElementsByName('track')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('track')[0].style.borderColor = 'grey'
    }

    if (!values.lyric) {
        errors.lyric = 'You need to add a lyric.'
        document.getElementsByName('lyric')[0].style.borderColor = 'red'
    } else {
        document.getElementsByName('lyric')[0].style.borderColor = 'grey'
    }

    return errors
}
