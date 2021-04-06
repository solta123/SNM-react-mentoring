const validate = (values, submitted) => {
    let errors = {};

        if (submitted) {

            if (!values.title) {
                errors.title = 'Required title';
            }

            if (!values.release_date) {
                errors.release_date = 'Required release date';
            }

            if (!values.poster_path) {
                errors.poster_path = 'Required to add a link to an image';
            }

            if (!values.genres.length) {
                errors.genres = 'Please add at least one genre';
            }

            if (!values.overview) {
                errors.overview = 'Required overview';
            }

            if ((!values.runtime && values.runtime !== 0) || values.runtime < 0) {
                errors.runtime = 'Hmm, this seems a little short...';
            }

        } else {
            errors = {
                title: '',
                release_date: '',
                poster_path: '',
                genres: '',
                overview: '',
                runtime: ''
            }
        }

        return errors;
}

export default validate;
