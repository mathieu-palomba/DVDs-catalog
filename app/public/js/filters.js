/**
 * Filters.
 */
var dvdCatFilter = angular.module('dvdCatFilter', []);

/**
 * This filter evaluate a boolean an return the corresponding unicode character.
 */
dvdCatFilter.filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});

/**
 * Filter to display only maxLength characters for the DVD overview.
 */
dvdCatFilter.filter('overviewMaxLength', function() {
        return function(overview) {
            var maxLength = 1000;
            return overview.length > maxLength ? overview.substr(0, maxLength) + '...' : overview;
        };
    }
);

/**
 * Filter to display the DVD genre in once line.
 */
dvdCatFilter.filter('dvdGenreInline', function() {
        return function(genres) {
            var genresToString = "";

            for(var genreID in genres) {
                var concat = '';
                genreID == genres.length-1 ? concat = '' : concat = ', ';

                genresToString += genres[genreID].name + concat;
            }

            return genresToString;
        };
    }
);

/**
 * This filter display the date with a french format.
 */
dvdCatFilter.filter('dateFormat', function() {
    return function(date) {
        return date.toDateString();
    };
});


/**
 * This filter permit to filter the movies with the movie format attribute.
 */
dvdCatFilter.filter('movieFormatFilter', function() {
    return function (data, currentMovieFormat, movieFormats) {
        console.log('plop');
        console.log(data);
        if (data.movieFormat === currentMovieFormat) {
            return true;
        } else if (currentMovieFormat === movieFormats.showAll) {
            return true;
        } else {
            return false;
        }
    };
});