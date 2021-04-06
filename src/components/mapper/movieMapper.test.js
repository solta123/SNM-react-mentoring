import { formatDate, mapMovie, getEmptyMovie } from './movieMapper';

describe('movieMapper', () => {
    it('should format date correctly', () => {
        let date = formatDate(new Date(2000, 1, 1));
        expect(date).toEqual('2000-02-01');
        date = formatDate(new Date(2001, 11, 22));
        expect(date).toEqual('2001-12-22');
    });

    it('should create empty movie', () => {
        const movie = getEmptyMovie();
        expect(movie.title).toEqual('');
        expect(movie.poster_path).toEqual('');
        expect(movie.overview).toEqual('');
        expect(movie.runtime).toEqual(0);
        expect(movie.genres.length).toEqual(0);
        expect(movie.release_date).toBeTruthy();
    });

    it('should map a movie', () => {
        let movie = mapMovie({});
        expect(movie.budget).toEqual(99999);
        expect(movie.revenue).toEqual(99999);
        expect(movie.vote_average).toEqual(4.5);
        expect(movie.vote_count).toEqual(400);
        expect(movie.tagline).toEqual('TODO - not in the form');
        expect(movie.runtime).toEqual(0);
        expect(movie.poster_path).toEqual('');

        movie = mapMovie({
            budget: 100,
            revenue: 200,
            vote_average: 6.0,
            vote_count: 10,
            tagline: 'tagline',
            runtime: 100,
            poster_path: 'link'
        });
        expect(movie.budget).toEqual(100);
        expect(movie.revenue).toEqual(200);
        expect(movie.vote_average).toEqual(6.0);
        expect(movie.vote_count).toEqual(10);
        expect(movie.tagline).toEqual('tagline');
        expect(movie.runtime).toEqual(100);
        expect(movie.poster_path).toEqual('link');
    });
});