import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";



export default function Album({GlobalState, route}) {

    const {
        dataSource,
    } = route.params


    //creating a state to save the image with a standard value in case there is no image
    const [uri, setUri] = useState( 'data:image/png;base64,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')



    React.useEffect(()=>{
        //fetching the image from the api
        fetch('http://coverartarchive.org/release-group/' + dataSource.id).then(response => response.json())
            .then((img) => {
                setUri(img.images[0]['image'].toString())
            }).catch((error) => {
                console.error(error + ' while loading image of: ' + dataSource.title)
        });
    }, );



    return(
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.title}>{dataSource.title}</Text>
                <Image style={styles.image} source={{uri: uri}}></Image>
                <View style={styles.metaData}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Release:</Text>
                        <Text style={styles.text}>{dataSource['first-release-date']}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Type:</Text>
                        <Text style={styles.text}>{dataSource['primary-type']}</Text>
                    </View>
                </View>
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
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    image:{
        width:300,
        height:300,
        borderRadius: 20
    },
    title:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 64,
    },
    text:{
        color: '#FFF',
        fontSize: 18,
        padding: 5,
    },
    metaData:{
        paddingTop: 32,
        width: '75%'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
    },
    icon: {
        paddingLeft: 30
    }
});


