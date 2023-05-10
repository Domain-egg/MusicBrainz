import React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView,
} from "react-native";
import AlbumComponent from "../components/AlbumComponent";


//Screen that shows all Releases of the selected Artist
export default function Artist({route, navigation}) {

    const {
        mbid,
    } = route.params

    const [dataSource, setDataSource] = React.useState({});

    React.useEffect(()=>{
        let url = 'https://musicbrainz.org/ws/2/release-group?artist='+ mbid +'&fmt=json'
        //fetch the releases of the selected artist fromm the API
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
                {/*create a list of the releases with 2 Columns*/}
                <FlatList
                    data={dataSource}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                        <AlbumComponent title = {item.title} mbid={item.id} onPress={()=>navigation.navigate('Album',{
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


