const validate = (values, submitted) => {
    let errors = {};

        if (submitted) {

            if (!values.title) {
                errors.title = 'ERROR_TITLE';
            }

            if (!values.release_date) {
                errors.release_date = 'ERROR_RELEASE_DATE';
            }

            if (!values.poster_path) {
                errors.poster_path = 'ERROR_POSTER_PATH';
            }

            if (!values.genres.length) {
                errors.genres = 'ERROR_GENRE';
            }

            if (!values.overview) {
                errors.overview = 'ERROR_OVERVIEW';
            }

            if ((!values.runtime && values.runtime !== 0) || values.runtime < 0) {
                errors.runtime = 'ERROR_RUNTIME';
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
