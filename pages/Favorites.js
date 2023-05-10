import React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView, Text, TouchableHighlight,
} from "react-native";



export default function Favorites({GlobalState, navigation}) {


    const colors = [
        '#1C3144',
        '#D00000',
        '#FFBA08',
        '#A2AEBB',
        '#3F88C5'
    ];

    let colorIndex = 0;

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.container}>
                {/*Show a list with the favorite Artists from the GlobalState*/}
                <FlatList
                    data={GlobalState.favorites}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => (

                        <TouchableHighlight
                            /*assigns a color to the Artist*/
                            style={styles.artist}
                            onPress={() => navigation.navigate('Artist', {
                                mbid: item['mbid'],
                                name: item['name'],
                            })}
                        >
                            <View style= {StyleSheet.compose(styles.background, {backgroundColor: colors.at(colorIndex++ % colors.length)})} >
                                <Text style={styles.title}>{item['name']}</Text>
                            </View>
                        </TouchableHighlight>

                    )}
                    numColumns={2}
                />
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        margin: 10,
        flex: 2,
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5,
        textAlign: "right",
        padding: 15,
        fontWeight: 'bold'

    },
    artist: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        marginBottom: 20,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',

    },
    background: {
        width: 150,
        height: 150,
        shadowColor: '#FFF',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius:20
    }
});


