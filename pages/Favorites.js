import React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView,
} from "react-native";
import AlbumComponent from "../components/AlbumComponent";



export default function Favorites({GlobalState, navigation}) {


    return(
        <SafeAreaView style={styles.body}>
            <View style={styles.container}>
                <FlatList
                    data={GlobalState.favorites}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <AlbumComponent title = {item.title} uri = {GlobalState.favoritesImg[index]} mbid={item.id} onPress={()=>navigation.navigate('Album',{
                            dataSource: item,
                        })}/>
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
});


