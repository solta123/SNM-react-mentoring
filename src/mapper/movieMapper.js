const formatDate = (date) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1 > 9 ? '' : '0')
        + (date.getMonth() + 1) + '-' + date.getDate()
}

export const getEmptyMovie = () => {
    return {
        title: '',
        release_date: formatDate(new Date()),
        genres: [],
        poster_path: '',
        runtime: 120,
        overview: ''
    };
};

// Adding missing properties
export const mapMovie = (movie) => {
    return {
        ...movie,
        budget: movie.budget || 99999,
        revenue: movie.revenue || 99999,
        vote_average: movie.vote_average || 4.5,
        vote_count: movie.vote_count || 400,
        tagline: movie.tagline || "TODO - not in the form"
    };
};
