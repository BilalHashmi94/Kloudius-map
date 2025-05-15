import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import {  Colors, Metrix } from '../config';
import { fonts } from '../config/Constants';

function Button({
  buttonText = "",
  textStyle = {},
  btnStyle = {},
  onPress = () => { },
  shadow = false,
  disabled = false,
  preIcon = null,
  postIcon = null
}) {
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={
        shadow ? { ...styles.buttonStyle, ...styles.btnShadow, ...btnStyle } : { ...styles.buttonStyle, ...btnStyle }
      }
      onPress={onPress}
    >
      {preIcon}
      <Text style={{ ...styles.btnTextStyle, ...textStyle }}>{buttonText}</Text>
      {postIcon}
    </TouchableOpacity>
  )
}

export default Button;


const  styles =  StyleSheet.create({
  buttonStyle: {
    // width: '100%',
    paddingHorizontal: Metrix.HorizontalSize(12),
    paddingVertical: Metrix.VerticalSize(16),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  btnShadow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
  },

  btnTextStyle: {
    fontSize: Metrix.customFontSize(15),
    color: Colors.buttonTextColor,
    fontFamily: fonts.Bold
  },
});