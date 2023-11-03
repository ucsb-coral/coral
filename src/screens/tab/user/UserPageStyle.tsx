import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    headerWrapper: {
        flexDirection: "row",
        alignItems: 'center', 
        padding: 40,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginRight: 22,
        marginTop: 20,
    },
    userInfoContainer: {
        flexDirection: 'column',
    },
    userName: {
        fontSize: 20,
        fontWeight: "700",
        fontFamily: "Inter-Bold",
        color: "#666",
    },
    userEmail: {
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Inter",
        color: "#999",
        marginTop: 5,
    },
    userLinksContainer: {
        flexDirection: "row", 
        marginTop: 5,
        justifyContent: 'center',  
        paddingHorizontal: 20, 
    },
    userLinks: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
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
        backgroundColor: '#F883791A',  
        borderRadius: 15,
        padding: 15,
        shadowColor: "#fff",
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
        flexDirection: "column",
        alignItems: 'center', 
        padding: 40,
        justifyContent: 'space-between',
      },
      longBarText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'left',
      },
      longBoxIcon: {
        textAlign: 'right',
        marginRight: 15,
      },
      longBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F883791A',
        borderRadius: 15,
        padding: 10,
        shadowColor: "#fff",
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
    
    
    


});