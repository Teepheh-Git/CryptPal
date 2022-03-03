import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { FONTS, SIZES } from "../../constants";


const SearchDropdown = ({ appTheme, navigation, data, renderItem }) => {


  const Notfound = () => {
    return (
      <View style={{
        width: SIZES.width * 0.7,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 30,
      }}>
        <Image style={{}} source={require("../../assets/images/Sad.png")} />
        <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>No news found</Text>
        <Text style={{ ...FONTS.body4, textAlign: "center", color: appTheme.textColor3 }}>Sorry, we cannot provide
          news based on your search at this time</Text>
      </View>
    );
  };


  return (
    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>


      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={Notfound}
        // ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={{ marginBottom: 70 }} />
        }
      />


    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: "absolute",
    // left: 0,
    // right: 0,
    // bottom: 0,
    // zIndex:100,
    top: SIZES.height * 0.21,
    width: SIZES.width,
    height: SIZES.height,
    alignSelf: "center",

  },

});


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDropdown);
