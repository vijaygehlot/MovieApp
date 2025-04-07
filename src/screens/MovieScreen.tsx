import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Colors from '../utils/colors';
import { CommonStateType, MovieType } from '../types';
import { addMovieToFavorites, getPostImageUrl } from '../utils/helper';
import FontIsto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useSelector } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

interface Props {
  route: { params: MovieType };
}

const { width } = Dimensions.get('window');

const MovieScreen = (props: Props) => {
  const item = props?.route?.params ?? {};
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);
  const [imgError, setImgError] = useState(false);

  const accountId = useSelector(
    (state: CommonStateType) => state.auth.accountId,
  );

  const imgSource: ImageSourcePropType = {
    uri: getPostImageUrl(item.poster_path, 'large'),
  };

  const navigation = useNavigation();

  const onPressAddFavorite = async () => {
    await addMovieToFavorites(
      navigation,
      accountId,
      item.id,
      setIsAuthInProgress,
    );
  };

  const renderAddFavoriteIcon = ({ tintColor }: HeaderButtonProps) =>
    isAuthInProgress ? (
      <ActivityIndicator size={24} color={tintColor} />
    ) : (

      <Ionicons
        size={24}
        name='bookmark-outline'
        color={tintColor}
        onPress={onPressAddFavorite}
      />
    );

  const renderImageError = () => (
    <View style={styles.imageErrorContainer}>
      <MaterialIcon
        name="report-gmailerrorred"
        size={150}
        color={Colors.subTextColor}
      />
      <Text style={styles.imageErrorText}>No movie poster found</Text>
    </View>
  );

  useEffect(() => {
    navigation.setOptions({ headerRight: renderAddFavoriteIcon });
  }, [navigation, isAuthInProgress]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        delay={100}
        style={styles.posterWrapper}
      >
        {imgError ? (
          renderImageError()
        ) : (
          <Image
            source={imgSource}
            style={styles.posterImage}
            onError={() => setImgError(true)}
          />
        )}
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.releaseAndRatingContainer}>
          <Text style={styles.releaseDate}>📅 {item.release_date}</Text>
          <View style={styles.ratingContainer}>
            <FontIsto name="star" style={styles.ratingIcon} />
            <Text style={styles.ratingText}>
              {item.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>

 
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.overviewScrollWrapper}>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator
            style={styles.overviewScroll}
          >
            <Text style={styles.overviewText}>{item.overview}</Text>
          </ScrollView>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 16,
  },
  posterWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  posterImage: {
    height: 520,
    width: width - 32,
    resizeMode: 'cover',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    color: Colors.textColor,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  releaseAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginHorizontal: 8,
  },
  releaseDate: {
    color: Colors.subTextColor,
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    color: Colors.ratingColor,
    fontSize: 18,
    marginRight: 4,
  },
  ratingText: {
    color: Colors.ratingColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    color: Colors.textColor,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 8,
  },
  overviewScrollWrapper: {
    height: 200,
    borderRadius: 8,
    backgroundColor: Colors.cardBackground,
    padding: 10,
  },
  overviewScroll: {
    flexGrow: 0,
  },
  overviewText: {
    color: Colors.subTextColor,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  imageErrorContainer: {
    height: 520,
    width: width - 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBackground,
    backgroundColor: Colors.cardBackground,
    elevation: 10,
  },
  imageErrorText: {
    marginTop: 24,
    color: Colors.subTextColor,
    fontSize: 20,
  },
});

export default MovieScreen;
