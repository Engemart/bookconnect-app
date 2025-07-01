import React, {useState} from "react";
import { SafeAreaView, TextInput, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginBottom:15,
        padding: 10,
        borderRadius: 4,
        marginTop: 3,
        width: 320,
        color:'#1a1a1a',
        fontSize: 18,
    }
});

export default function MeuInput(props){
 
    const [value, setValue] = useState("");

    const handleChange = (text) => {
        setValue(text);
        props.onChangeText(text);
    }

    return(
        <SafeAreaView>
        <Text>{props.label}</Text>
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            value={value}
            secureTextEntry={props.password}
            onChangeText={handleChange}
        />
        </SafeAreaView>
    );
        
    
}
