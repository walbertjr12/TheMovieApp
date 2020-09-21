import {map} from 'lodash';
import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Title, Text} from 'react-native-paper';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenreMoviesApi,
} from '../api/movies';
import CarouselMulti from '../components/CarouselMulti';
import CarouselVertical from '../components/CarouselVertical';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState([]);

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

  useEffect(() => {
    getAllGenresApi().then((response) => {
      setGenreList(response.genres);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then((response) => {
      setGenreMovies(response.results);
    });
  }, [genreSelected]);

  const onChangeGenre = (newGenreId) => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {newMovies && (
          <View style={styles.news}>
            <Title style={styles.newsTitle}>Nuevas Películas</Title>
            <CarouselVertical data={newMovies} navigation={navigation} />
          </View>
        )}
      </ScrollView>
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por género</Title>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.genreList}>
          {map(genreList, (genre, index) => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                genre.id === genreSelected && {
                  backgroundColor: '#efb810',
                  color: '#000',
                  borderRadius: 20,
                },
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        <CarouselMulti data={genreMovies} navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 10,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  genres: {
    marginTop: 15,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  genreList: {
    marginTop: 5,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    fontSize: 16,
    marginRight: 20,
    padding: 3,
  },
});
