import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function PerfilScreen({ route, navigation }) {
  const { email } = route.params || {};

  const handleCompras = () => {
    navigation.navigate("Compras"); // ajuste o nome conforme seu app

  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="user-circle" size={90} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.titulo}>Perfil do Usuário</Text>

        <View style={styles.info}>
          <Text style={styles.label}>📧 E-mail:</Text>
          <Text style={styles.valor}>{email || "não informado"}</Text>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleCompras}>
          <Text style={styles.botaoTexto}>🛍 Ver Compras Feitas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  info: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  valor: {
    fontSize: 16,
    color: "#222",
    marginTop: 4,
  },
  botao: {
    backgroundColor: "#4F8EF7",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
