import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, FlatList, Image, ImageBackground, View,StatusBar } from "react-native";
import { constants } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { SIZES } from "../../constants/theme";
import { connect } from "react-redux";
import OnBoardingItem from "../../components/OnBoardingItem";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Paginator = ({ data, scrollX }) => {
  return (
    <View style={styles.pagination}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * SIZES.width,
          index * SIZES.width,
          (index + 1) * SIZES.width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 19, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};


const OnBoarding = ({ appTheme }) => {


  const navigation = useNavigation();


  const scrollTo = async () => {
    if (currentIndex < constants.slides.length - 1) {
      slidesRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      try {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        navigation.navigate("BottomTabs");
      } catch (error) {
        console.log("Error @setItem", error);
      }

    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;


  useEffect(() => {


    setTimeout(() => {

      <ActivityIndicator size="small" color={appTheme.textColor2} />;
    }, 5000);


  }, []);


  return (
    <ImageBackground source={require("../../assets/images/bg_gradient.png")}
                     style={[styles.root, { backgroundColor: appTheme.backgroundColor }]}>

      <StatusBar translucent={true} backgroundColor={"transparent"} />

      <View style={[styles.headerContainer, { backgroundColor: "transparent" }]}>
        <Image style={styles.img} source={require("../../assets/images/logo.png")} />
      </View>

      <FlatList
        data={constants.slides}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        snapToAlignment={"center"}
        bounces={"false"}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />

      <Paginator data={constants.slides} scrollX={scrollX} />

      <View style={styles.buttonContainer}>
        <CustomButton text={"Get Started 😎"} onPress={scrollTo} containerStyle={{ top: 30 }} />
      </View>


    </ImageBackground>
  );
};


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
