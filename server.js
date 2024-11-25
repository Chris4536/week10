const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    let url = 'https://api.themoviedb.org/3/movie/558449?api_key=37c52736899600ac82440a953d6f4175';
    axios.get(url)
    .then(response => {
        let data = response.data;
        let releaseDate = new Date(data.release_date).getFullYear();

        let genres = '';
        data.genres.forEach(genre => {
            genres = genres + `${genre.name}, `;
        });


        let genresUpdated = genres.slice(0, -2) + '.';
        let posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;

        let currentYear = new Date().getFullYear();

        res.render('index', { 
            dataToRender: data,
            year: currentYear, 
            releaseYear: releaseDate,
            genres: genresUpdated,
            poster: posterUrl
        }); 
    })
    .catch(error => {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Something went wrong while fetching movie data.'); 
    });
});

app.listen(process.env.PORT||3000, () => {
    console.log('Server is running on port 3000.');
});