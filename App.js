import React, {useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import HomeScreen from './pages/HomeScreen';
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Favorites from "./pages/Favorites";
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator()

export default function App(){

    //creating the States to save favorites, favorites contains an Array of Albums as JSON
    const [favoritesId, setFavoritesId] = useState([]);
    const [favoritesName, setFavoritesName] = useState([]);

    const GlobalState = {
        favoritesId, setFavoritesId,
        favoritesName, setFavoritesName

    }

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false,}}></Stack.Screen>
                <Stack.Screen name="Artist" options={{ title: '', headerStyle: { backgroundColor: '#121212',}, headerTintColor: '#fff',
                }}>
                    {props => <Artist {...props} GlobalState={GlobalState}/>}
                </Stack.Screen>
                <Stack.Screen
                    name="Album"
                    options={{title: '', headerStyle:{backgroundColor: '#121212'}, headerTintColor:'#ffd'} }>
                    {props => <Album {...props} />}
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