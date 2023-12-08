import {StyleSheet} from 'react-native';
import {
  white,
  red,
  black,
  grey,
  coral,
  lightGrey,
  darkGrey,
  GreyUseForButton,
  ButtonBackground,
} from '../../../utilities/colors';
import {buttonFont, NameFont, EmailFont} from '../../../utilities/textfont';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollView: {},
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 22,
    // marginTop: 20,
  },
  userInfoContainer: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    // height: '100%',
  },
  userName: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: NameFont,
    color: darkGrey,
  },
  UserNewName: {
    fontSize: 20,
    fontWeight: '600',
    height: 55,
    fontFamily: NameFont,
    color: darkGrey,
    width: '70%',
    textAlignVertical: 'top',
    padding: 0,
    marginLeft: 2,
  },
  UserNewBioInput: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: NameFont,
    color: darkGrey,
    textAlignVertical: 'top',
    flex: 1,
    padding: 0,
    marginLeft: 2,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: EmailFont,
    color: lightGrey,
    marginTop: 5,
  },
  userLinksContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  userLinks: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: buttonFont,
    color: GreyUseForButton,
  },
  userBioContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    //backgroundColor: grey,
  },
  userBioTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#AAAAAA',
    borderRadius: 15,
    padding: 10,
    width: '93%',
  },
  goToLinkImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ButtonBackground,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#fff',
    width: '50%',
    marginHorizontal: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 10,
  },
  settingBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40,
    justifyContent: 'space-between',
  },
  BioBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40,
    justifyContent: 'space-between',
  },
  longBarText: {
    fontSize: 18,
    fontWeight: '700',
    color: GreyUseForButton,
    textAlign: 'left',
    fontFamily: buttonFont,
  },
  UserNewNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: GreyUseForButton,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontFamily: buttonFont,
  },
  characterCountText: {
    fontSize: 12,
    fontWeight: '100',
    color: GreyUseForButton,
    fontFamily: buttonFont,
    textAlign: 'right',
  },

  UserNewBioText: {
    fontSize: 18,
    fontWeight: '700',
    color: GreyUseForButton,
    textAlign: 'left',
    fontFamily: buttonFont,
  },
  longBoxIcon: {
    textAlign: 'right',
    marginRight: 15,
  },
  longBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ButtonBackground,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#fff',
    width: '114%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 5,
  },
  UserNewNameBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: ButtonBackground,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#fff',
    width: '114%',
    height: 90,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 10,
  },
  UserNewBioBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: ButtonBackground,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#fff',
    width: '114%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 40,
  },
  gobackBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    padding: 10,
    shadowColor: '#fff',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
  },
  doneBox: {
    borderRadius: 20,
    width: 60,
    marginRight: 10,
    backgroundColor: black,
    padding: 10,
    shadowColor: '#fff',
  },
  doneText: {
    fontSize: 15,

    fontWeight: '700',
    color: white,
    textAlign: 'center',
    fontFamily: buttonFont,
  },

  signOutContainer: {
    bottom: 0,
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ButtonBackground,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#fff',
    width: '114%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 5,
  },
  signOutText: {
    fontSize: 18,
    fontWeight: '700',
    color: red,
    fontFamily: buttonFont,
    textAlign: 'center',
  },
  courseCard: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: ButtonBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    padding: 8,
  },
  courseCardTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  courseModalButtonText: {
    fontSize: 18,
    color: white,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  courseModalButton: {
    backgroundColor: coral,
    marginTop: 22,
    marginLeft: '20%',
    alignItems: 'center',
    width: '80%',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '60%',
    height: '20%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  courseModalText: {
    color: grey,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 25,
  },
});
