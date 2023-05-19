import React, {useState} from "react";
import {StyleSheet, Text, TouchableHighlight, TextInput, View, FlatList, Image} from "react-native";
import {Icon} from 'react-native-elements'


const colors = [
        '#1C3144',
        '#D00000',
        '#FFBA08',
        '#A2AEBB',
        '#3F88C5'
    ];

let colorIndex = 0;

export default function HomeScreen({navigation}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [dataSource, setDataSource] = React.useState({});

    //Gets Results of the API and saves them
    function search(string){
        setSearchTerm(string);
        let url = 'https://musicbrainz.org/ws/2/artist?query=\''+ string +'\'&limit=20&fmt=json'
        fetch(url, {headers: {
                'User-Agent':'MusicBrainzTest/0.0.1 (alex.domanegg@outlook.com)'
            }
        })
            .then(response => response.json())
            .then((data)=>{
                setDataSource(data.artists);
            }).catch((error) => console.log(error))
    }

    return (
        <View style={styles.body}>
            {/*View and Image change Size when SearchTerm gets inserted*/}
            <View style={StyleSheet.compose(styles.logo, {height: searchTerm.length <= 0?'40%':'0%'})}>
                <Image style={{width: searchTerm.length <= 0? 200 :0 , height:200}} source={{uri: 'https://cdn.pixabay.com/photo/2020/09/25/02/56/music-5600363_960_720.png'}}>
                </Image>
            </View>
            <View style={styles.row}>
                {/*TextInput calls search() on any change of the Input*/}
                <TextInput style={styles.search} clearButtonMode='while-editing' placeholderTextColor='#000' placeholder='Search' onChangeText={value => search(value)}/>
                <TouchableHighlight><Icon
                    raised
                    name='heart'
                    type='font-awesome'
                    color='#f50'
                    onPress={()=>navigation.navigate('Favorites')}/></TouchableHighlight>
            </View>
            {/*Shows a list of the search Results*/}
            <View style={styles.container}>
                <FlatList
                    data={dataSource}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            /*assigns a color to the Artist*/
                            style={StyleSheet.compose(styles.item, {backgroundColor:colors.at(colorIndex++%colors.length)})}
                            onPress={()=> navigation.navigate('Artist',{
                                mbid: item.id,
                                name: item.name,
                            })}
                        >
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableHighlight>
                    )}
                />
            </View>
            <View style={StyleSheet.compose(styles.row, styles.creditView)}>
                <Text style={styles.credits}>Alex Domanegg 12133780</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#121212',
    },
    search: {
        flex: 1,
        backgroundColor: '#fff',
        marginRight: 30,
        padding: 20,
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20
    },
    credits: {
        color: '#737373'
    },
    creditView: {
        flex: 0,
        height: 30
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    container: {
        margin: 10,
        flex: 2,
        justifyContent: 'center',
    },
    itemName: {
        color: '#FFF',
        fontSize: 20,
        shadowRadius:10,
        shadowColor:'#000',
        shadowOpacity: 1,
    },
    item:{
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        height: 100,
        padding:5
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

