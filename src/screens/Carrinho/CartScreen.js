import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";

export default function CartScreen() {
  const route = useRoute();
  const itens = route.params?.itens || [];

  // Função para extrair número do preço (ex: "R$ 49,90" → 49.90)
  const parsePreco = (preco) => {
    return parseFloat(preco.replace("R$", "").replace(",", "."));
  };

  // Calcula o total
  const total = itens.reduce((sum, item) => sum + parsePreco(item.preco), 0);

  // Finaliza compra
  const finalizarCompra = () => {
    Alert.alert("Compra realizada com sucesso", `Total pago: R$ ${total.toFixed(2)}`, [
      { text: "OK" },
    ]);
  };

  // Renderiza cada item do carrinho
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <View>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>{item.preco}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu Carrinho</Text>

      {itens.length === 0 ? (
        <Text style={styles.vazio}>Seu carrinho está vazio 😢</Text>
      ) : (
        <>
          <FlatList
            data={itens}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalTexto}>Total:</Text>
            <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.botao} onPress={finalizarCompra}>
            <Text style={styles.textoBotao}>Finalizar Compra</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  vazio: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  imagem: {
    width: 60,
    height: 90,
    marginRight: 12,
    borderRadius: 6,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  preco: {
    fontSize: 16,
    color: "#007BFF",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 16,
    marginTop: 16,
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalValor: {
    fontSize: 20,
    fontWeight: "bold",
  },
  botao: {
    marginTop: 20,
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
