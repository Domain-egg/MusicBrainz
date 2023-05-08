import React, {useState} from "react";
import {StyleSheet, Text, ScrollView, TouchableHighlight, TextInput, View, FlatList, SafeAreaView, Image} from "react-native";
import {Icon} from 'react-native-elements'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationContainer from "@react-navigation/native/src/NavigationContainer";

const colors = [
        '#1C3144',
        '#D00000',
        '#FFBA08',
    '#A2AEBB',
    '#3F88C5'
    ];

var colorIndex = 0;

export default function HomeScreen({navigation}) {
    const [searchTerm, setSearchTerm] = useState('')

    const [dataSource, setDataSource] = React.useState({});

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
        <SafeAreaView style={styles.body}>
            <View style={StyleSheet.compose(styles.logo, {height: searchTerm.length <= 0?'40%':'0%'})}><Image style={{width: searchTerm.length <= 0? 200 :0 , height:200}} source={{uri: 'https://cdn.pixabay.com/photo/2020/09/25/02/56/music-5600363_960_720.png'}}></Image></View>
            <View style={styles.row}>
                <TextInput style={styles.search} clearButtonMode='while-editing' placeholderTextColor='#000' placeholder='Search' onChangeText={value => search(value)}/>
                <TouchableHighlight><Icon
                    raised
                    name='heart'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => console.log('hello')}/></TouchableHighlight>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={dataSource}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            style={StyleSheet.compose(styles.item, {backgroundColor:colors.at(colorIndex++%colors.length)})}
                            onPress={()=> navigation.navigate('Artist',{
                                mbid: item.id,
                                name: item.name,
                            })}
                        >
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableHighlight>
                    )}
                    /*numColumns={2}
                    keyExtractor={(item, index) => index}*/
                />
            </View>
            <View style={StyleSheet.compose(styles.row, styles.creditView)}>
                <Text style={styles.credits}>Alex Domanegg 12133780</Text>
            </View>
        </SafeAreaView>
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

