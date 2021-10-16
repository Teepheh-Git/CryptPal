import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../../constants/theme';


const CustomButton = ({ containerStyle, onPress, text }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={[styles.container, { ...containerStyle }]} onPress={onPress}>
            <LinearGradient style={styles.root} colors={[COLORS.white, COLORS.white]}>

                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50,
        width: SIZES.width * 0.7,
        height: 68,
        backgroundColor: "#ffffff",
        borderRadius: SIZES.radius3,


    },
    root: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius2,
    },
    text: {
        color: COLORS.primary,
        ...FONTS.h5,
    },
})
