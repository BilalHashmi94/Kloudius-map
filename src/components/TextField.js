import React from 'react';
import {TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Colors, Images, Metrix} from '../config';
import EvillIcons from 'react-native-vector-icons/EvilIcons';
import {fonts} from '../config/Constants';
import { useTheme } from '@react-navigation/native';

function TextField({
  secureTextEntry = false,
  onChangeText = () => {},
  value = '',
  placeholderTextColor ,
  style = {},
  multiline = false,
  keyboardType = 'default',
  noOfLines = 1,
  placeholder = '',
  disable = true,
  maxLength = maxLength,
  onFocus= onFocus
}) {

  return (
    <>
      <TextInput
        style={{...styles.input, ...style}}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        numberOfLine={noOfLines}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.textColor}
        editable={disable}
        maxLength={maxLength}
        onFocus={onFocus}
      />
    </>
  );
}

export default TextField;

const  styles = StyleSheet.create({
  iconStyle: {
    // right:true,
    position: 'absolute',
    zIndex: 100,
    top: Metrix.VerticalSize(22),
  },
  input: {
    marginTop: Metrix.VerticalSize(10),
    width: '100%',
    height: Metrix.VerticalSize(48),
    fontSize: Metrix.customFontSize(12),
    padding: 5,
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.black,
    backgroundColor: Colors.textFiledBG,
    borderRadius: 10,
    fontFamily: fonts.Regular,
    // borderColor: Colors.primary,
    // borderWidth: 1
  },
});
