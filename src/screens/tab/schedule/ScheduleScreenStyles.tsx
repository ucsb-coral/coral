import { StyleSheet } from 'react-native';
import { scale, standardMargin } from '../../../utilities/scale';
import { buttonFont, NameFont, EmailFont, avenirBlackCentered } from "../../../utilities/textfont";
import { black, coral, grey, opacity, white, ButtonBackground, } from '../../../utilities/colors';

export const styles = StyleSheet.create({
  courseText: {
    color: grey,
  },

  courseBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    padding: 8,
    borderRadius: 15,
    backgroundColor: ButtonBackground,
    marginBottom: standardMargin,
  },

  eachCourseTitle: {
    color: 'black',
    fontFamily: buttonFont,
    fontWeight: '700',
    fontSize: 18,
  },

  eachCourseInfoTitle: {
    color: black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  eachCourseInfoPosition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  eachCourseInfoWindow: {
    width: 300,
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  toggleAndManageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ButtonBackground,
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  toggleAndManageButtonText: {
    color: black,
    fontFamily: buttonFont,
    fontWeight: '700',
    fontSize: 18,
  },
  notEnrolledText: {
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: avenirBlackCentered,
    fontSize: 20,
    color: 'black'
  },
  courseFlatListStyle: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    paddingLeft: standardMargin,
    paddingRight: standardMargin,
  },

});