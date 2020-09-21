import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {BASE_PATH_IMG} from '../utils/constants';
import Carousel from 'react-native-snap-carousel';
import {getGenreMovieApi} from '../api/movies';
import {map, size} from 'lodash';

const {width, height} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);
const IMAGE_HEIGTH = Math.round(height * 0.2);

export default function CarouselMulti(props) {
  const {data, navigation} = props;
  return (
    <Carousel
      layout="default"
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      firstItem={1}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
    />
  );
}

function RenderItem(props) {
  const {data, navigation} = props;
  const {id, title, poster_path} = data.item;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const onNavigation = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Title style={styles.title} numberOfLines={1}>
          {title}
        </Title>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '85%',
    height: IMAGE_HEIGTH,
    borderRadius: 20,
  },
  title: {
    marginTop: 5,
    marginHorizontal: 10,
    fontSize: 12,
  },
});
