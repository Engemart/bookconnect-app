import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // ícones modernos
import SuperButton from "../../components/SuperButton";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigation = useNavigation();

  const logar = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={{
        uri:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.titulo}>BookConnect</Text>

        {/* Input E-mail */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={20} color="#00e5ff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail ou usuário"
              placeholderTextColor="rgba(0,229,255,0.6)"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
              selectionColor="#00e5ff"
            />
          </View>
        </View>

        {/* Input Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color="#00e5ff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="rgba(0,229,255,0.6)"
              secureTextEntry
              onChangeText={setSenha}
              value={senha}
              selectionColor="#00e5ff"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.recuperarSenhaContainer} activeOpacity={0.7}>
          <Text style={styles.textoRecuperarSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* Botões centralizados, um abaixo do outro */}
        <View style={styles.botaoContainer}>
          <SuperButton
            type="primary"
            value="Entrar"
            onPress={logar}
            style={styles.botao}
            textStyle={styles.textoBotao}
          />
          <SuperButton
            type="outlined"
            value="Cadastrar"
            onPress={logar}
            style={[styles.botao, styles.botaoOutlined]}
            textStyle={[styles.textoBotao, styles.textoBotaoOutlined]}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 30, 0.85)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    zIndex: 10,
  },
  titulo: {
    fontSize: 36, // tamanho reduzido aqui
    color: "#00e5ff",
    fontWeight: "900",
    marginBottom: 50,
    textAlign: "center",
    textShadowColor: "#00e5ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 5,
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Roboto",
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    color: "#00e5ff",
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 16,
    letterSpacing: 1,
    textShadowColor: "#005c66",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,229,255,0.1)",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#00e5ff",
    paddingHorizontal: 15,
    shadowColor: "#00e5ff",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: "#00e5ff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    paddingVertical: 8,
  },
  recuperarSenhaContainer: {
    marginBottom: 40,
    alignSelf: "flex-end",
  },
  textoRecuperarSenha: {
    color: "#00e5ff",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
    textShadowColor: "#005c66",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  botaoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  botao: {
    width: "80%",
    borderRadius: 25,
    paddingVertical: 14,
    backgroundColor: "#00e5ff",
    shadowColor: "#00e5ff",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    marginVertical: 6,
  },
  botaoOutlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#00e5ff",
  },
  textoBotao: {
    color: "#001f27",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1.2,
  },
  textoBotaoOutlined: {
    color: "#00e5ff",
  },
});



