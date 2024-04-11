import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import { white, red, black, gold, coral, lightGrey, darkGrey, GreyUseForButton, ButtonBackground } from '../../../utilities/colors';
import { buttonFont, NameFont, EmailFont } from '../../../utilities/textfont';

const DEVICEPIXELRATIO = PixelRatio.get();

export const styles = StyleSheet.create({
  joinButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 17,
    backgroundColor: coral,
    borderRadius: 45,
    width: PixelRatio.getPixelSizeForLayoutSize(81 / DEVICEPIXELRATIO),
    height: PixelRatio.getPixelSizeForLayoutSize(32 / DEVICEPIXELRATIO),
  },
  joinButtonText: {
    color: gold,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    height: 50,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 23,
    color: coral,
    fontWeight: '700',
    fontFamily: NameFont,
  },
  CurrentClasschatList: {
    flex: 1,
    padding: 15,
    color: black,
    // height: screenHeight * 2 / 3,
  },
  chatItem: {
    backgroundColor: ButtonBackground,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 20,
    paddingLeft: 15,
    color: coral,
    marginBottom: 5,
    fontWeight: '600',
    fontFamily: NameFont,
  },
  chatName: {
    fontSize: 18,
    color: black,
    marginBottom: 5,
    fontWeight: '700',
    fontFamily: NameFont,
  },
  chatMessage: {
    fontSize: 12,
    color: lightGrey,
  },
  bottomBar: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    backgroundColor: white,
  },
});

// export const modalStyles = StyleSheet.create({
//   modalContainer: {
//     backgroundColor: white, // from your color utilities
//     borderRadius: 15, // matching the chatItem borderRadius
//     padding: 15, // consistent with chatItem padding
//     margin: 20, // to give some space around the modal
//     alignItems: 'center', // center items horizontally
//     justifyContent: 'center', // center items vertically
//     shadowOpacity: 0.3, // slight shadow for depth
//     shadowRadius: 5, // matching the modal's border radius
//     shadowColor: black, // using black for shadow from your colors
//     shadowOffset: { height: 2, width: 2 },
//     elevation: 5, // for Android
//     maxWidth: 500, // to ensure modal is not too wide on large screens
//     alignSelf: 'center', // to ensure modal is centered in the view
//     // Ensure modal is centered in the screen vertically
//     marginTop: 'auto', 
//     marginBottom: 'auto', 
//     // Use DEVICEPIXELRATIO to scale sizes for different screen densities
//     width: PixelRatio.getPixelSizeForLayoutSize(300 / DEVICEPIXELRATIO),
//     height: PixelRatio.getPixelSizeForLayoutSize(500 / DEVICEPIXELRATIO),
//   },
//   // ... Add other modal-specific styles here as needed ...
// });