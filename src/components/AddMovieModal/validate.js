const validate = (values, submitted) => {
    let errors = {};

        if (submitted) {

            if (!values.title) {
                errors.title = 'error_title';
            }

            if (!values.release_date) {
                errors.release_date = 'error_release_date';
            }

            if (!values.poster_path) {
                errors.poster_path = 'error_poster_path';
            }

            if (!values.genres.length) {
                errors.genres = 'error_genre';
            }

            if (!values.overview) {
                errors.overview = 'error_overview';
            }

            if ((!values.runtime && values.runtime !== 0) || values.runtime < 0) {
                errors.runtime = 'error_runtime';
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
