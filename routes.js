import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { CORES } from "./src/constants/cores";

// Telas
import LoginScreen from "./src/screens/Login";
import HomeScreen from "./src/screens/Home";
import ProdutoScreen from "./src/screens/Produtos";
import PerfilScreen from "./src/screens/Perfil/PerfilScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigate = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color }) => (
          <SimpleLineIcons name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Produtos"
      component={ProdutoScreen}
      options={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color }) => (
          <SimpleLineIcons name="wrench" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigate = ({ route }) => {
  // Pega os params passados do Stack (Login -> Home)
  const { email, senha } = route.params || {};

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: CORES.COR_FUNDO_DARK,
        drawerInactiveTintColor: CORES.COR_FUNDO_LIGHT,
        drawerActiveBackgroundColor: CORES.COR_SECUNDARIA,
        drawerInactiveBackgroundColor: CORES.COR_INATIVO,
        drawerStyle: {
          backgroundColor: CORES.COR_FUNDO_DARK,
          marginTop: 50,
          borderRadius: 4,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigate}
        options={{
          drawerIcon: ({ color }) => (
            <SimpleLineIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Produtos"
        component={ProdutoScreen}
        options={{
          drawerIcon: ({ color }) => (
            <SimpleLineIcons name="wrench" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          drawerIcon: ({ color }) => (
            <SimpleLineIcons name="user" size={24} color={color} />
          ),
        }}
        initialParams={{ email, senha }} // repassa os dados para o Perfil
      />
    </Drawer.Navigator>
  );
};

const StackNavigate = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      options={{ headerShown: false }}
    >
      {({ route, navigation }) => (
        <DrawerNavigate route={route} navigation={navigation} />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

export default function Routes() {
  return (
    <NavigationContainer>
      <StackNavigate />
    </NavigationContainer>
  );
}
