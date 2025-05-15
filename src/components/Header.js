import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import {fonts} from '../config/Constants';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={Images.logo}
        style={{
          width: '100%',
          height: Metrix.VerticalSize(100),
          resizeMode: 'contain',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(100),
    backgroundColor: Colors.background,
    // borderBottomLeftRadius: Metrix.HorizontalSize(30),
    // borderBottomRightRadius: Metrix.HorizontalSize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(20),
    // alignItems: 'center',
  },
  imageContainer: {
    // width: Metrix.HorizontalSize(120),
    // height: Metrix.HorizontalSize(120),
  },
  image: {
    width: 120,
    height: 120,
  },
  tabIcon: {
    width: Metrix.HorizontalSize(24),
    height: Metrix.VerticalSize(24),
    alignItems: 'center',
  },
  bellIcon: {
    borderRadius: 12,
  },
  redDot: {
    position: 'absolute',
    borderRadius: 5,
    height: 10,
    width: 10,
    right: Metrix.HorizontalSize(0),
    top: Metrix.VerticalSize(0),
    zIndex: 100,
    backgroundColor: Colors.redDark,
  },
  title: {
    fontSize: Metrix.customFontSize(25),
    fontFamily: fonts.Black,
    color: Colors.white,
    textAlign: 'left',
  },
});
