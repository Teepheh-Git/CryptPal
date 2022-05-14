import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { FONTS, icons, SIZES } from "../../constants";
import FastImage from "react-native-fast-image";
import NotchResponsive from "../../components/NotchResponsive";
import * as Animatable from "react-native-animatable";
import { debounce } from "lodash";
import axios from "axios";


const Search = ({ navigation }) => {

  const { appTheme } = useSelector(state => state.themeReducer);


  const [coinSearch, setCoinSearch] = useState("");
  const [coinResult, setCoinResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);


  const handleSearch = useCallback(debounce(() => Search(), 2000), [coinSearch]);


  const Search = async () => {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${coinSearch}`);
      setCoinResult(res?.data?.coins);
      if (res) {
        setLoading(false);
      }
    } catch (e) {
      console.error(e, "SearchExampleError");
      setLoading(false);
    }
  };


  const CoinListRenderItem = ({ item, index }) => {
    return (

      <Animatable.View animation={"zoomIn"} delay={index * 10} useNativeDriver={true} duration={200}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchCoinDetails", item.id);

          }}
          style={[styles.box, { backgroundColor: appTheme.backgroundColor }]}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: item?.large,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{
              width: SIZES.font1,
              height: SIZES.font1,
              borderRadius: 30,
              marginRight: 5,
            }} />

          <View style={styles.textContainer}>
            <View>
              <Text style={[styles.name, { color: appTheme.textColor }]}>{item?.name}</Text>
              <Text style={[styles.symbol, { color: appTheme.textColor3 }]}>{item.symbol}</Text>
            </View>
            <Text style={[styles.rank, { color: appTheme.textColor3 }]}>Rank: #{item?.market_cap_rank}</Text>

          </View>

        </TouchableOpacity>
      </Animatable.View>

    );

  };


  const TopResults = () => {
    if (coinSearch !== "" && coinResult.length !== 0) {
      return (
        <View style={{ width: SIZES.width * 0.9, marginTop: 10 }}>
          <Text style={{ alignSelf: "flex-start", color: appTheme.textColor3, ...FONTS.body8 }}>Top Results</Text>
        </View>
      );
    }
  };


  const AboutToSearch = () => {
    return (
      <Animatable.View useNativeDriver={true} duration={500} animation={"slideInUp"} style={{
        width: SIZES.width * 0.7,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 30,
      }}>
        <Image style={{}} source={require("../../assets/images/Thinking.png")} />
        <Text style={{ ...FONTS.h7, color: appTheme.textColor, marginVertical: 5 }}>What are you searching for?</Text>
        <Text style={{
          ...FONTS.body8,
          textAlign: "center",
          color: appTheme.textColor3,
        }}>
          Sorry, you'll have to make a search to get any result here.</Text>
      </Animatable.View>

    );
  };
  const Notfound = () => {
    return (
      <Animatable.View useNativeDriver={true} duration={500} animation={"zoomIn"} style={{
        width: SIZES.width * 0.7,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 30,
      }}>
        <Image style={{}} source={require("../../assets/images/Sad.png")} />
        <Text style={{ ...FONTS.h7, color: appTheme.textColor, marginVertical: 5 }}>No result found</Text>
        <Text style={{ ...FONTS.body8, textAlign: "center", color: appTheme.textColor3 }}>Sorry, we couldn't find any
          result in our database</Text>
      </Animatable.View>
    );
  };


  return (
    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

        <CustomHeader title="Search" image={icons.search} onPress={() => navigation.goBack()} />
        <Animatable.View useNativeDriver={true} duration={500} animation={"slideInLeft"} style={{
          flexDirection: "row",
          width: SIZES.width * 0.9,
          height: SIZES.font1 * 1.4,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <TextInput
            placeholder={"Search any crypto coin..."}
            value={coinSearch}
            onChangeText={value => {
              setCoinSearch(value);
              setLoading(true);
              if (value.length >= 2) {
                handleSearch();
              }
            }}
            placeholderTextColor={appTheme.textColor3}
            onFocus={() => setIsFocused(true)}
            multiline={false}
            style={{
              width: SIZES.width * 0.9,
              height: SIZES.font1 * 1.7,
              backgroundColor: appTheme.backgroundColor,
              borderRadius: 8,
              borderWidth: isFocused ? 1 : null,
              borderColor: isFocused ? appTheme.textColor2 : null,
              paddingHorizontal: 15,
              left: 10,
              paddingRight: 30,
              color: appTheme.textColor,
            }}>
          </TextInput>
          <Image
            resizeMode={"contain"}
            style={{ width: SIZES.font8, height: SIZES.font8, tintColor: appTheme.textColor3, right: 15 }}
            source={icons.searchBarIcon} />
        </Animatable.View>


        {/*{searchCoin === "" && AboutToSearch()}*/}

        {/*{searchCoin !== "" && TopResults()}*/}
        {coinSearch !== "" && TopResults()}

        {coinSearch === "" ? AboutToSearch() : (loading ?
            <ActivityIndicator style={{ marginVertical: 15 }} color={appTheme.textColor2} size={"large"} /> :
            <FlatList
              data={coinResult}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              removeClippedSubviews={true}
              ListEmptyComponent={Notfound}
              renderItem={CoinListRenderItem}
            />

        )}
      </View>
    </>

  );
};

export default Search;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: SIZES.height,
  },

  box: {
    height: SIZES.height * 0.1,
    width: SIZES.width * 0.9,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 5,
    width: "90%",
    height: 45,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  name: {
    ...SIZES.font6,
  },
  symbol: {
    ...FONTS.body9,
    top: SIZES.font6,
  },
  rank: {
    ...FONTS.body9,
    top: 5,
    textDecorationLine: "underline",
    fontStyle: "italic",
    alignSelf: "center",
  },

});


