import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getNewsMoviesApi} from '../api/movies';

export default function Home() {
  const [newMovies, setNewMovies] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
