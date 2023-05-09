import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
} from "react-native";
import {Icon} from 'react-native-elements'
import AlbumComponent from "../components/AlbumComponent";



export default function Artist({route, navigation}) {

    const {
        mbid,
    } = route.params

    const [dataSource, setDataSource] = React.useState({});
    const [imageUrl, setImageUrl] = React.useState([]);

    React.useEffect(()=>{
        let url = 'https://musicbrainz.org/ws/2/release-group?artist='+ mbid +'&fmt=json'
        fetch(url, {headers: {
                'User-Agent':'MusicBrainzTest/0.0.1 (alex.domanegg@outlook.com)'
            }
        })
            .then(response => response.json())
            .then((data)=>{
                setDataSource(data["release-groups"]);
            }).catch((error) => console.log(error))
    }, []);


    return(
        <SafeAreaView style={styles.body}>
            <View style={styles.container}>

                <FlatList
                    data={dataSource}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <AlbumComponent title = {item.title} uri = {imageUrl[index]} mbid={item.id} onPress={()=>navigation.navigate('Album',{
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


