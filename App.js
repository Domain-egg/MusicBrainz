import React, {useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import HomeScreen from './pages/HomeScreen';
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Favorites from "./pages/Favorites";

const Stack = createNativeStackNavigator()

export default function App(){

    //creating the States to save favorites, favorites contains an Array of Albums as JSON
    const [favorites, setFavorites] = useState([]);
    const [favoritesImg, setFavoritesImg] = useState([]);

    const GlobalState = {
        favorites, setFavorites,
        favoritesImg, setFavoritesImg,
    }

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false,}}></Stack.Screen>
                <Stack.Screen name="Artist" component={Artist} options={({ route }) => ({ title: route.params.name, headerStyle: {
                        backgroundColor: 'rgb(18,18,18)',
                    }, headerTintColor: '#fff',
                }) }></Stack.Screen>
                <Stack.Screen
                    name="Album"
                    options={{title: '', headerStyle:{backgroundColor: '#121212'}, headerTintColor:'#fff'} }>
                    {props => <Album {...props} GlobalState={GlobalState}/>}
                </Stack.Screen>
                <Stack.Screen
                    name="Favorites"
                    options={{title: 'Favorites', headerStyle:{backgroundColor: '#121212'}, headerTintColor:'#fff'} }>
                    {props => <Favorites {...props} GlobalState={GlobalState}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );

}