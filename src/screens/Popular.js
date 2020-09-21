import {map} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {getPopularMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import noImage from '../assets/jpg/default-imgage.png';
import {Rating} from 'react-native-ratings';

import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/img/starDark.png';
import starLight from '../assets/img/starLight.png';

export default function Popular(props) {
  const {theme} = usePreferences();
  const {navigation} = props;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(null);
  const [showBtnMore, setShowBtnMore] = useState(true);
  useEffect(() => {
    getPopularMoviesApi(page).then((response) => {
      const totalPage = response.total_pages;
      if (page < totalPage) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    });
  }, [page]);
  return (
    <ScrollView style={{marginRight: 10}}>
      {map(movies, (movie, index) => (
        <Movie
          key={index}
          movie={movie}
          theme={theme}
          navigation={navigation}
        />
      ))}
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}
          onPress={() => setPage(page + 1)}>
          Cargar más...
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const {movie, theme, navigation} = props;
  const {
    id,
    poster_path,
    title,
    release_date,
    vote_count,
    vote_average,
  } = movie;

  const goMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={
              poster_path
                ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`}
                : noImage
            }
          />
        </View>
        <View>
          <Title>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating
            voteCount={vote_count}
            voteAverage={vote_average}
            theme={theme}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MovieRating(props) {
  const {voteCount, voteAverage, theme} = props;
  const media = voteAverage / 2;
  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        startingValue={media}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        imageSize={20}
        style={{marginRight: 15}}
      />
      <Text style={{fontSize: 12, marginTop: 5}}>{voteCount} votos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 20,
  },
  image: {
    height: 150,
    width: 100,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
