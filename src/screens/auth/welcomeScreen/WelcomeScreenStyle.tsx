import { StyleSheet } from "react-native";
import {white,
        red,
        black,
        grey,
        coral,
        lightGrey,
        darkGrey,
        GreyUseForButton,
        ButtonBackground,
} from '../../../utilities/colors';
import{buttonFont,
       NameFont,
       EmailFont,
} from "../../../utilities/textfont";

export const styles = StyleSheet.create({

    container:{
        backgroundColor: white,
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    image:{
        width : 280,
        height : 58,
        resizeMode : 'stretch',
        marginTop : 165,
    },

    button:{
        width: 230,
        height: 68,
        alignContent: 'center',
        justifyContent: 'center',
    },
    
    text:{
        fontSize : 15,
        color : coral,
        marginBottom : 35,
        fontWeight: '700',
        fontFamily: NameFont,
    },

});