import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from "../../constants";


const CustomButton = ({ containerStyle, onPress, text }) => {
    return (
        <Pressable activeOpacity={0.8} style={[styles.container, { ...containerStyle }]} onPress={onPress}>
            <LinearGradient style={styles.root} colors={[COLORS.white, COLORS.white]}>

                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50,
        width: SIZES.width * 0.75,
        height: SIZES.height*0.08,
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
        ...FONTS.h8,
    },
})
