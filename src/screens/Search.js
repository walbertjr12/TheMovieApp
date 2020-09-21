import {map} from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {searchMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

export default function Search(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.length > 2) {
      searchMoviesApi(search).then((response) => {
        setMovies(response.results);
      });
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu película"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {movies &&
            map(movies, (movie, index) => (
              <Movie key={index} movie={movie} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const {movie, navigation} = props;
  const {id, title, poster_path} = movie;

  const goMovie = () => {
    navigation.navigate('movie', {id});
  };
  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    height: 300,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
