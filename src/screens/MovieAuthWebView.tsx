import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {BASE_URLS} from '../api/baseURL';
import {getUserAccountId} from '../api/helper';
import {useDispatch} from 'react-redux';
import {authActions} from '../redux/action';
import Snackbar from 'react-native-snackbar';
import {StackActions, useNavigation} from '@react-navigation/native';
import {SCREEN} from '../navigation/route';

interface Props {
  route: {params: {requestToken: string; isSourceFavoritesIcon: boolean}};
}

const MovieAuthWebView = (props: Props) => {
  const {requestToken, isSourceFavoritesIcon = true} =
    props?.route?.params ?? {};

  const accountIdRef = useRef<number | null>(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigationHelper = () => {
    if (isSourceFavoritesIcon) {
      navigation.dispatch(StackActions.replace(SCREEN.FAVORITES_SCREEN));
    } else {
      navigation.goBack();
    }
  };

  const onNavigationStateChange = async (event: WebViewNavigation) => {
    if (!event.loading && event.url.includes('/allow')) {
      const accountId = await getUserAccountId(requestToken);
      if (accountId) {
        accountIdRef.current = accountId;
        dispatch(authActions.storeAccountIdSuccess(accountId));
        navigationHelper();
      } else if (!accountId && !accountIdRef.current) {
        navigation.goBack();
        Snackbar.show({text: 'Failed to get account ID'});
      }
    }
  };

  return (
    <WebView
      source={{uri: `${BASE_URLS.AUTHENTICATION}/${requestToken}`}}
      style={styles.container}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieAuthWebView;
