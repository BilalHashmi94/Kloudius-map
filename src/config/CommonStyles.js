import Colors from './Colors';
import Metrix from './Metrix';

const CommonStyles = {
  textStyles: {
    heading: {
      fontFamily: 'Gilroy-Black',
      fontSize: Metrix.customFontSize(25),
      color: Colors.black,
    },
    intro: {
      fontFamily: 'Gilroy-SemiBold',
      fontSize: Metrix.customFontSize(13),
      color: Colors.introText,
    },
    semiHeading: {
      fontFamily: 'Gilroy-SemiBold',
      fontSize: Metrix.customFontSize(18),
      color: Colors.black,
    },
    textInputText: {
      fontFamily: 'Gilroy-SemiBold',
      fontSize: Metrix.customFontSize(15),
      color: Colors.black,
    },
    buttonText: {
      fontFamily: 'Gilroy-SemiBold',
      fontSize: Metrix.customFontSize(17),
      color: Colors.white,
    },
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(28),
  },
  topSvgContainer: {
    marginTop: Metrix.VerticalSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default CommonStyles;
