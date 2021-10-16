
import React from 'react'
import { Platform, Image, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorite from '../screens/Favorite';
import Home from '../screens/Home';
import icons from '../constants/icons';
import News from '../screens/News';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import { connect } from 'react-redux';
import { toggleTheme } from '../stores/theme/themeActions';
import { COLORS, FONTS } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import OnBoarding from '../screens/OnBoarding';


const Tab = createBottomTabNavigator();

const BottomTabs = ({ appTheme }) => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                paddingHorizontal: 15,
                right: 0,
                borderRadius: 40,
                elevation: 0,
                backgroundColor: appTheme.backgroundColor,
                borderTopColor: 'transparent',
                height: Platform.OS === 'android' ? 80 : 100,
            },


        }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <View
                                    style={{
                                        alignItems: 'center',
                                        height: 50,
                                        justifyContent: 'space-around',
                                    }}>
                                    <Text
                                        style={{ ...FONTS.h4, color: COLORS.primary, top: 20 }}>
                                        Home
                                    </Text>
                                    <Text style={{ ...FONTS.largeTitle, color: COLORS.primary }}>
                                        .
                                    </Text>
                                </View>
                            );
                        } else {
                            return (
                                <Image
                                    source={icons.home}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: COLORS.grey,
                                    }}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <View
                                    style={{
                                        alignItems: 'center',
                                        height: 50,
                                        justifyContent: 'space-around',
                                    }}>
                                    <Text
                                        style={{ ...FONTS.h4, color: COLORS.primary, top: 20 }}>
                                        Favorite
                                    </Text>
                                    <Text style={{ ...FONTS.largeTitle, color: COLORS.primary }}>
                                        .
                                    </Text>
                                </View>
                            );
                        } else {
                            return (
                                <Image
                                    source={icons.star}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: COLORS.grey,
                                    }}
                                />
                            );
                        }
                    },
                }} />
            <Tab.Screen name="Search" component={Search} options

                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    height: 50,
                                    justifyContent: 'space-around',
                                }}>
                                <LinearGradient
                                    style={{
                                        width: 70,
                                        height: 70,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bottom: 20,
                                        borderRadius: 35,
                                    }}
                                    colors={['#6B55D0', '#8572D8']}>
                                    <Image
                                        source={icons.search}
                                        style={{ width: 20, height: 20, tintColor: COLORS.white }}
                                    />
                                </LinearGradient>
                            </View>
                        );
                    },
                }}

            />
            <Tab.Screen
                name="News"
                component={News}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <View
                                    style={{
                                        alignItems: 'center',
                                        height: 50,
                                        justifyContent: 'space-around',
                                    }}>
                                    <Text
                                        style={{ ...FONTS.h4, color: COLORS.primary, top: 20 }}>
                                        News
                                    </Text>
                                    <Text style={{ ...FONTS.largeTitle, color: COLORS.primary }}>
                                        .
                                    </Text>
                                </View>
                            );
                        } else {
                            return (
                                <Image
                                    source={icons.news}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: COLORS.grey,
                                    }}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    height: 50,
                                    justifyContent: 'space-around',
                                }}>
                                <Text
                                    style={{ ...FONTS.h4, color: COLORS.primary, top: 20 }}>
                                    Settings
                                </Text>
                                <Text style={{ ...FONTS.largeTitle, color: COLORS.primary }}>
                                    .
                                </Text>
                            </View>
                        );
                    } else {
                        return (
                            <Image
                                source={icons.settings}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.grey,
                                }}
                            />
                        );
                    }
                },
            }} />
        </Tab.Navigator>
    )
}



export function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: themeType => {
            return dispatch(toggleTheme(themeType));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabs);
