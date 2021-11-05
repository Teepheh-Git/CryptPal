import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { COLORS, FONTS, icons, SIZES } from '../../constants'


const CustomHeader = ({ appTheme, title, onPress, image }) => {
    return (
        <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            <TouchableOpacity activeOpacity={0.6} style={[styles.backArrowContainer, { backgroundColor: appTheme.backgroundColor }]} onPress={onPress}>
                <Image style={styles.backArrow} source={icons.backArrow} />

            </TouchableOpacity>



            <View style={styles.overviewContainer}>

                <Text style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>
                <Image style={styles.overviewImage} source={image} />
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        height: SIZES.height * 0.08,
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
        elevation: 4,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 2,
            height: 3,
        },


    },
    backArrowContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 0.6,
        borderColor: COLORS.grey

    },
    backArrow: {

        width: 24,
        height: 24,

    },
    title: {
        ...FONTS.h2,
        marginHorizontal: 5,

    },
    overviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width * 0.8,
        justifyContent: 'center',
        paddingRight: 30


    },
    overviewImage: {
        width: 20,
        height: 20,
    }
})


export function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
