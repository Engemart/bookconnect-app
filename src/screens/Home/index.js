import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [carrinho, setCarrinho] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemCompra, setMensagemCompra] = useState("");
  const [categoriaAtual, setCategoriaAtual] = useState("destaque");

  const adicionarAoCarrinho = (livro) => {
    setCarrinho((prev) => [...prev, livro]);
    Alert.alert("Adicionado ao carrinho", `${livro.nome} foi adicionado.`);
  };

  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione livros ao carrinho antes!");
      return;
    }

    const total = carrinho.reduce((soma, item) => {
      const preco = parseFloat(item.preco.replace("R$ ", "").replace(",", "."));
      return soma + preco;
    }, 0);

    setMensagemCompra(`Obrigado pela compra! Total: R$ ${total.toFixed(2).replace(".", ",")}`);

    setTimeout(() => {
      setCarrinho([]);
      setMensagemCompra("");
      setModalVisible(false);
    }, 3000);
  };

  const livrosParaExibir =
    categoriaAtual === "destaque" ? livrosDestaque : livrosCiaDoLivro;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>📚 BookConnect</Text>

      <View style={styles.botoesCategoria}>
        <TouchableOpacity
          style={[
            styles.botaoCategoria,
            categoriaAtual === "destaque" && styles.botaoSelecionado,
          ]}
          onPress={() => setCategoriaAtual("destaque")}
        >
          <Text style={styles.textoBotaoCategoria}>📖 Livros em Destaque</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoCategoria,
            categoriaAtual === "cia" && styles.botaoSelecionado,
          ]}
          onPress={() => setCategoriaAtual("cia")}
        >
          <Text style={styles.textoBotaoCategoria}>🏢 CIA do Livro</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {livrosParaExibir.map((livro, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: livro.imagem }}
              style={[
                styles.imagem,
                categoriaAtual === "cia" && { borderRadius: 0 },
              ]}
            />
            <View style={styles.cardContent}>
              <Text style={styles.nome}>{livro.nome}</Text>
              <Text style={styles.preco}>{livro.preco}</Text>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarAoCarrinho(livro)}
              >
                <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="cart-outline" size={24} color="#fff" />
        <Text style={styles.textoCarrinho}>Carrinho ({carrinho.length})</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitulo}>🛒 Carrinho</Text>
          {mensagemCompra ? (
            <View style={styles.mensagemCompraContainer}>
              <Text style={styles.mensagemCompraTexto}>{mensagemCompra}</Text>
            </View>
          ) : carrinho.length === 0 ? (
            <Text style={styles.vazio}>Seu carrinho está vazio.</Text>
          ) : (
            carrinho.map((item, idx) => (
              <View key={idx} style={styles.itemCarrinho}>
                <Text style={styles.nomeItem}>{item.nome}</Text>
                <Text>{item.preco}</Text>
              </View>
            ))
          )}

          {!mensagemCompra && (
            <>
              <TouchableOpacity style={styles.finalizarBtn} onPress={finalizarCompra}>
                <Text style={styles.finalizarTexto}>Finalizar Compra</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fecharModal}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.fecharTexto}>Fechar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const livrosDestaque = [
  {
    nome: "Hábitos Atômicos",
    preco: "R$ 49,90",
    imagem: "https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg",
  },
  {
    nome: "O Poder do Hábito",
    preco: "R$ 42,00",
    imagem: "https://m.media-amazon.com/images/I/81drfTT9ZfL.jpg",
  },
  {
    nome: "Mindset",
    preco: "R$ 43,90",
    imagem: "https://m.media-amazon.com/images/I/71HMyqG6MRL.jpg",
  },
];

const livrosCiaDoLivro = [
  {
    nome: "Educação Financeira para Jovens",
    preco: "R$ 29,90",
    imagem:
      "https://www.ciadolivro.com.br/media/catalog/product/cache/1/image/600x800/9df78eab33525d08d6e5fb8d27136e95/e/d/educacao-financeira-jovens.jpg",
  },
  {
    nome: "O Pequeno Cientista",
    preco: "R$ 39,90",
    imagem:
      "https://www.ciadolivro.com.br/media/catalog/product/cache/1/image/600x800/9df78eab33525d08d6e5fb8d27136e95/c/i/cia-livro-cientista.jpg",
  },
  {
    nome: "Descobrindo a Leitura",
    preco: "R$ 25,00",
    imagem:
      "https://www.ciadolivro.com.br/media/catalog/product/cache/1/image/600x800/9df78eab33525d08d6e5fb8d27136e95/d/e/descobrindo-leitura.jpg",
  },
  {
    nome: "História das Invenções",
    preco: "R$ 35,50",
    imagem:
      "https://www.ciadolivro.com.br/media/catalog/product/cache/1/image/600x800/9df78eab33525d08d6e5fb8d27136e95/h/i/historia-das-invencoes.jpg",
  },
  {
    nome: "Brincando e Aprendendo",
    preco: "R$ 22,00",
    imagem:
      "https://www.ciadolivro.com.br/media/catalog/product/cache/1/image/600x800/9df78eab33525d08d6e5fb8d27136e95/b/r/brincando-e-aprendendo.jpg",
  },
  {
    nome: "Meu Primeiro Livro de Ciências",
    preco: "R$ 31,90",
    imagem:
      "https://www.ciadolivro.com.br/media/catalog/product/cache/1/image/600x800/9df78eab33525d08d6e5fb8d27136e95/m/e/meu-primeiro-livro-ciencias.jpg",
  },
  {
    nome: "O Mundo dos Números",
    preco: "R$ 27,40",
    imagem:
      "https://www.ciadolivro.com.br/media/catalog/product/cache/1/image/600x800/9df78eab33525d08d6e5fb8d27136e95/o/m/o-mundo-dos-numeros.jpg",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  botoesCategoria: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  botaoCategoria: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  botaoSelecionado: {
    backgroundColor: "#007BFF",
  },
  textoBotaoCategoria: {
    color: "#fff",
    fontWeight: "bold",
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
  },
  imagem: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
    alignItems: "center",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    color: "#007BFF",
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
  },
  botaoCarrinho: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  textoCarrinho: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemCarrinho: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  nomeItem: {
    fontSize: 16,
    fontWeight: "500",
  },
  finalizarBtn: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  finalizarTexto: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  fecharModal: {
    marginTop: 16,
    alignItems: "center",
  },
  fecharTexto: {
    color: "#007BFF",
    fontSize: 16,
  },
  vazio: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
  mensagemCompraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  mensagemCompraTexto: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#28a745",
  },
});
