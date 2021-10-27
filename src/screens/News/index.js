import moment from 'moment'
import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { NewsData } from '../../assets/data/newsData'
import { SAMPLE_DATA } from '../../assets/data/sampleData'
import CoinList from '../../components/CoinList'
import NewsListItem from '../../components/NewsListItem'
import { FONTS, icons, SIZES } from '../../constants'

const News = ({ appTheme, navigation }) => {




    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: appTheme.textColor }]}>News 📄</Text>
                </View>
                <TouchableOpacity style={styles.filterButtonContainer}>
                    <Image style={styles.filterButton} source={icons.filterButton} />
                </TouchableOpacity>

            </View>




            <FlatList
                data={NewsData.results}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={
                    Separator = () => <View style={{ width: SIZES.width * 0.9, backgroundColor: appTheme.textColor3, height: 0.4 }} ></View>
                }
                renderItem={({ item }) =>

                    <NewsListItem title={item.title} time={moment(item.created_at).format('LLLL')} link={'read more'} onPress={() => navigation.navigate('NewsWebPage', { ...item })} />


                }
                listFooterComponent={
                    <View style={{ marginBottom: 70 }} />
                }
            />



        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: SIZES.width,
        // height: SIZES.height

    },
    headerContainer: {
        height: 55,
        width: SIZES.width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },
    filterButtonContainer: {
        justifyContent: 'flex-end'
    },
    filterButton: {
        width: 48,
        height: 36,
    },
    titleContainer: {
        width: SIZES.width * 0.775,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        ...FONTS.h2,
        marginHorizontal: 5,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(News);