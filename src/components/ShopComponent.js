import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import {fonts} from '../config/Constants';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ShopComponent = ({item, index, viewOnMap = () => {}}) => {
  return (
    <View style={styles.itemContainer}>
      <View
        style={{...styles.row, paddingHorizontal: Metrix.HorizontalSize(20)}}>
        <View
          style={{
            flex: 1,
            marginHorizontal: Metrix.HorizontalSize(10),
            justifyContent: 'center',
          }}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemDescription}>{item.address}</Text>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => viewOnMap(item)}>
          <Fontisto
            name={'map-marker-alt'}
            color={Colors.redDark}
            size={Metrix.customFontSize(22)}
          />
          <Text
            style={{
              ...styles.itemDescription,
              color: Colors.redDark,
              textDecorationLine: 'underline',
              marginLeft: Metrix.VerticalSize(4),
            }}>
            View On Map
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height: Metrix.VerticalSize(16)}}></View>
    </View>
  );
};

export default ShopComponent;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(20),
    // overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,

    paddingTop: Metrix.VerticalSize(10),
    marginHorizontal: Metrix.HorizontalSize(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carImage: {
    width: Metrix.HorizontalSize(59),
    height: Metrix.HorizontalSize(59),
    borderRadius: Metrix.HorizontalSize(100),
  },
  rightArrow: {
    width: Metrix.HorizontalSize(19),
    height: Metrix.HorizontalSize(19),
    alignSelf: 'center',
    marginLeft: Metrix.HorizontalSize(10),
  },
  itemName: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Bold,
    color: Colors.redDark,
    textAlign: 'left',
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Medium,
    color: Colors.grayText,
    marginTop: Metrix.VerticalSize(5),
  },
  status: {
    fontSize: Metrix.customFontSize(11),
    fontFamily: fonts.RegularItalic,
  },
  itemDescription2: {
    fontSize: Metrix.customFontSize(9),
    fontFamily: fonts.Regular,
    color: Colors.background,
    marginLeft: 5,
  },
});
