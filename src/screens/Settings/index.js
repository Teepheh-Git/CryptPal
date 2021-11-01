import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    useRef,
    useState
} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { toggleTheme } from '../../stores/theme/themeActions';
import { toggleCurrency } from '../../stores/currency/currencyActions'
import { COLORS, FONTS, SIZES } from '../../constants';
import ActionSheet from 'react-native-actionsheet';



const Settings = ({ appTheme, appCurrency, toggleTheme, toggleCurrency }) => {

    let actionSheet = useRef()

    let currencyList = ['dollar', 'naira', 'euro', 'yen', 'cancel']

    // const [status, setStatus] = useState('usd')



    // setStatusFilter = status => {

    //     setStatus(status)



    //     if (status === 'usd') {
    //         toggleCurrency('usd')

    //     } if (status === 'ngn') {
    //         toggleCurrency('ngn')



    //     } if (status === 'eur') {
    //         toggleCurrency('eur')


    //     } if (status === 'jpy') {
    //         toggleCurrency('jpy')

    //     }

    // }



    function toggleThemeHandler() {
        if (appTheme.name === 'light') {
            toggleTheme('dark');
        } else {
            toggleTheme('light');
        }
    }



    function toggleCurrencyHandler() {
        if (appCurrency.name === 'dollar') {
            toggleCurrency('euro');
        } else {
            toggleCurrency('naira')
        }
    }




    const showCurrencyOption = () => {
        actionSheet.current.show()

    }




    const ClearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')

        } catch (error) {
            console.log('Error @clearOnboarding: ', error)

        }

    }

    const ClearFavorites = async () => {
        try {
            await AsyncStorage.removeItem('FavoriteCoin')

        } catch (error) {
            console.log('Error Favorite: ', error)

        }

    }


    return (
        <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>



            {/* <View style={styles.listTab}  >
                {
                    constants.currencyToggle.map((buttonLabel, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.btnTab, status === buttonLabel.status && styles.btnTabActive]}
                            onPress={() => setStatusFilter(buttonLabel.status)}
                        >
                            <Text style={[styles.textTab, status === buttonLabel.status && styles.textTabActive]}>{buttonLabel.status}</Text>
                        </TouchableOpacity>

                    ))
                }


            </View> */}




            <TouchableOpacity
                style={{ height: 60, width: "50%", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginVertical: 10 }}
                onPress={() => toggleThemeHandler()}>
                <Text>Toggle Theme </Text>

            </TouchableOpacity>


            <TouchableOpacity
                style={{ height: 60, width: "50%", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => ClearOnboarding()}>
                <Text>Reset Onboarding </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={{ height: 60, width: "50%", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => ClearFavorites()}>
                <Text>Clear Favorites </Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={{ height: 60, width: "50%", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={toggleCurrencyHandler()}>
                <Text>Currency Options </Text>

            </TouchableOpacity>


            <ActionSheet
                ref={actionSheet}
                title={'currency'}
                options={currencyList}
                cancelButtonIndex={4}
                onPress={(item) => {


                    if (appCurrency.name === 'dollar') {
                        toggleCurrency[item[3]]
                    } if (appCurrency.name === 'naira') {
                        toggleCurrency[item[2]]
                    } if (appCurrency.name === 'euro') {
                        toggleCurrency[item[1]]
                    } if (appCurrency.name === 'yen') {
                        toggleCurrency[item[0]]
                    }
                }}


            />



        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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

    }, textTab: {
        ...FONTS.body5,
        paddingHorizontal: 5,
        color: COLORS.grey,
        marginHorizontal: 5
    },
    btnTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    textTabActive: {
        color: 'white'
    }
})




export function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
        appCurrency: state.currencyReducer.appCurrency,
        error: state.currencyReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: themeType => {
            return dispatch(toggleTheme(themeType));
        },
        toggleCurrency: currencyType => {
            return dispatch(toggleCurrency(currencyType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);