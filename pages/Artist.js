import React, {useState} from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Text, TouchableHighlight,

} from "react-native";
import AlbumComponent from "../components/AlbumComponent";
import {Icon} from "react-native-elements";


//Screen that shows all Releases of the selected Artist
export default function Artist({route, navigation, GlobalState}) {

    //a state to save if this Artist is a favorite, so if changed the screen renders
    const [favorite, setFavorite] = useState(false)

    const {
        mbid,
        name,
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
        //searching inside zhe GlobalState to check if Album is set as favorite
        setFavorite(GlobalState.favoritesId.includes(mbid))
    }, []);


    return(
        <View style={styles.body}>
            <View style={styles.row}>
                <Text style={styles.title}>{name}</Text>
                <TouchableHighlight>
                    <Icon
                        style={styles.icon}
                        name='heart'
                        type='font-awesome'
                        color= {favorite?'#f50':'#b7b7b7'}
                        onPress={() => {
                            let bufferId = GlobalState.favoritesId;
                            let bufferName = GlobalState.favoritesName;
                            if(bufferId.includes(mbid)) {
                                setFavorite(false);
                                //had a bug where splice can't get rid of the first element in the array
                                //because of this here a separation, that in the case a shift() gets called
                                if(bufferId.indexOf(mbid)===0) {
                                    bufferId.shift()
                                    bufferName.shift()
                                }else{
                                    bufferId.splice(bufferId.indexOf(mbid),bufferId.indexOf(mbid))
                                    bufferName.splice(bufferId.indexOf(mbid),bufferId.indexOf(mbid))
                                }
                            }else {
                                setFavorite(true);
                                bufferId.push(mbid)
                                bufferName.push(name)
                            }
                            GlobalState.setFavoritesId(bufferId);
                            GlobalState.setFavoritesName(bufferName);
                        }}>
                    </Icon>
                </TouchableHighlight>
            </View>
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
        </View>
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
    title:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 8,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        paddingHorizontal: 36
    },
    icon: {
        paddingLeft: 30
    }
});


