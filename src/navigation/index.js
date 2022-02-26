import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorite from "../screens/Favorite";
import Home from "../screens/Home";
import icons from "../constants/icons";
import News from "../screens/News";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import { connect } from "react-redux";
import { toggleTheme } from "../stores/theme/themeActions";
import { COLORS, FONTS } from "../constants";
import LinearGradient from "react-native-linear-gradient";


const TabBarCustomButton = ({ children, onPress, appTheme }) => {

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}>

      {children}

    </TouchableOpacity>
  );
};


const Tab = createBottomTabNavigator();

const BottomTabs = ({ appTheme, navigation }) => {


  return (
    <Tab.Navigator
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          paddingHorizontal: 15,
          right: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          elevation: 4,
          shadowOpacity: 0.04,
          shadowOffset: {
            width: 3,
            height: -3,
          },
          backgroundColor: appTheme.backgroundColor,
          borderTopColor: "transparent",
          height: Platform.OS === "android" ? 95 : 90,
        },


      }}>
      <Tab.Screen name="Home" component={Home}
                  options={{
                    tabBarIcon: ({ focused }) => {
                      if (focused) {
                        return (
                          <View
                            style={{
                              alignItems: "center",
                              height: 50,
                              justifyContent: "space-around",
                            }}>
                            <Text
                              style={{ ...FONTS.h4, color: appTheme.textColor2, top: 20 }}>
                              Home
                            </Text>
                            <Text style={{ ...FONTS.largeTitle, color: appTheme.textColor2 }}>
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
                    alignItems: "center",
                    height: 50,
                    justifyContent: "space-around",
                  }}>
                  <Text
                    style={{ ...FONTS.h4, color: appTheme.textColor2, top: 20 }}>
                    Favorite
                  </Text>
                  <Text style={{ ...FONTS.largeTitle, color: appTheme.textColor2 }}>
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
      <Tab.Screen name="Search" component={Search}

                  options={{
                    tabBarIcon: ({ focused }) => {
                      return (
                        <View
                          style={{
                            alignItems: "center",
                            height: 50,
                            justifyContent: "space-around",
                            elevation: 7,
                            shadowOpacity: 0.1,
                            shadowOffset: {
                              width: 4,
                              height: 5,
                            },
                          }}>
                          <LinearGradient
                            style={{
                              width: 70,
                              height: 70,
                              alignItems: "center",
                              justifyContent: "center",
                              bottom: 20,
                              borderRadius: 35,

                            }}
                            colors={["#6B55D0", "#8572D8"]}>
                            <Image
                              source={icons.search}
                              style={{ width: 20, height: 20, tintColor: COLORS.white }}
                            />
                          </LinearGradient>
                        </View>
                      );
                    },

                    tabBarButton: (props) => (
                      <TabBarCustomButton
                        {...props}
                        onPress={() => navigation.navigate("Search")}
                      />
                    ),

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
                    alignItems: "center",
                    height: 50,
                    justifyContent: "space-around",
                  }}>
                  <Text
                    style={{ ...FONTS.h4, color: appTheme.textColor2, top: 20 }}>
                    News
                  </Text>
                  <Text style={{ ...FONTS.largeTitle, color: appTheme.textColor2 }}>
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
                  alignItems: "center",
                  height: 50,
                  justifyContent: "space-around",
                }}>
                <Text
                  style={{ ...FONTS.h4, color: appTheme.textColor2, top: 20 }}>
                  Settings
                </Text>
                <Text style={{ ...FONTS.largeTitle, color: appTheme.textColor2 }}>
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
  );
};


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
