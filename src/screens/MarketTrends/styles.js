import { StyleSheet, } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        alignItems: 'center',
        width: SIZES.width
    },
    listTab: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: SIZES.width * 0.9,
        alignItems: 'center',

    },
    btnTab: {
        height: 40,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 0.25,
        alignItems: 'center',
        borderColor: COLORS.grey,
        borderRadius: 5,
        justifyContent: 'center'

    },
    textTab: {
        ...FONTS.body5,
        marginHorizontal: 5,
        color: COLORS.grey,
    },
    btnTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    textTabActive: {
        color: 'white'
    },
    refreshButton: {
        width: SIZES.width * 0.34,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius3,
        marginVertical: 40,
    },
    refresh: {
        color: COLORS.white,
        ...FONTS.h5,
    },
    networkErrorContainer: {
        width: SIZES.width * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        top: SIZES.height * 0.2
    },
    networkErrorText: {
        ...FONTS.h4,
        marginVertical: 5,
    },
    networkErrorDesc: {
        ...FONTS.body4,
        textAlign: 'center',
    },

})
export default styles
