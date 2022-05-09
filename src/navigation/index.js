import React from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorite from "../screens/Favorite";
import Home from "../screens/Home";
import icons from "../constants/icons";
import News from "../screens/News";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import { connect } from "react-redux";
import { COLORS, FONTS, SIZES } from "../constants";
import LinearGradient from "react-native-linear-gradient";


const TabBarCustomButton = ({ children, onPress, appTheme }) => {

  return (
    <Pressable
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}>

      {children}

    </Pressable>
  );
};


const Tab = createBottomTabNavigator();

const BottomTabs = ({ appTheme, navigation, appLaunch }) => {


  return (
    <Tab.Navigator
      initialRouteName={appLaunch.name}
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        lazy: false,
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
          shadowColor: appTheme.textColor,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          backgroundColor: appTheme.backgroundColor2,
          borderTopColor: "transparent",
          height: Platform.OS === "android" ? SIZES.font1 * 2.6 : SIZES.font1 * 3,
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
                              height: SIZES.font1 * 1.3,
                              justifyContent: "space-around",
                            }}>
                            <Text
                              style={{ ...FONTS.h9, color: appTheme.textColor2, top: SIZES.font9 }}>
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
                            resizeMode="cover"
                            style={{
                              width: SIZES.font2,
                              height: SIZES.font2,
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
                    height: SIZES.font1 * 1.3,
                    justifyContent: "space-around",
                  }}>
                  <Text
                    style={{ ...FONTS.h9, color: appTheme.textColor2, top: SIZES.font9 }}>
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
                    width: SIZES.font4,
                    height: SIZES.font4,
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
                            // height: 50,
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
                              width: SIZES.font1 * 2,
                              height: SIZES.font1 * 2,
                              alignItems: "center",
                              justifyContent: "center",
                              bottom: SIZES.font6,
                              borderRadius: 35,

                            }}
                            colors={["#6B55D0", "#8572D8"]}>
                            <Image
                              source={icons.search}
                              style={{ width: SIZES.font6, height: SIZES.font6, tintColor: COLORS.white }}
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
                    height: SIZES.font1 * 1.3,
                    justifyContent: "space-around",
                  }}>
                  <Text
                    style={{ ...FONTS.h9, color: appTheme.textColor2, top: SIZES.font9 }}>
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
                    width: SIZES.font4,
                    height: SIZES.font4,
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
                  height: SIZES.font1 * 1.3,
                  justifyContent: "space-around",
                }}>
                <Text
                  style={{ ...FONTS.h9, color: appTheme.textColor2, top: SIZES.font9 }}>
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
                  width: SIZES.font4,
                  height: SIZES.font4,
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
    appLaunch: state.launchReducer.appLaunch,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabs);
