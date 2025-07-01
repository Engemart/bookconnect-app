import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Modal,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const livros = [
  { nome: "Hábitos Atômicos", preco: "R$ 49,90", tema: "Autoajuda" },
  { nome: "O Poder do Hábito", preco: "R$ 42,00", tema: "Autoajuda" },
  { nome: "Essencialismo", preco: "R$ 35,00", tema: "Produtividade" },
  { nome: "Os Segredos da Mente Milionária", preco: "R$ 29,90", tema: "Finanças" },
  { nome: "Pai Rico, Pai Pobre", preco: "R$ 34,90", tema: "Finanças" },
  { nome: "Quem Pensa, Enriquece", preco: "R$ 38,00", tema: "Finanças" },
  { nome: "Mindset", preco: "R$ 43,90", tema: "Psicologia" },
  { nome: "Do Mil ao Milhão", preco: "R$ 36,50", tema: "Finanças" },
  { nome: "O Milagre da Manhã", preco: "R$ 31,90", tema: "Autoajuda" },
  { nome: "O Homem Mais Rico da Babilônia", preco: "R$ 25,00", tema: "Finanças" },
  { nome: "Como Fazer Amigos e Influenciar Pessoas", preco: "R$ 40,00", tema: "Desenvolvimento Pessoal" },
  { nome: "A Lei do Triunfo", preco: "R$ 30,00", tema: "Motivação" },
  { nome: "O Monge e o Executivo", preco: "R$ 28,00", tema: "Liderança" },
  { nome: "Pense e Enriqueça", preco: "R$ 33,00", tema: "Finanças" },
  { nome: "O Jeito Harvard de Ser Feliz", preco: "R$ 37,00", tema: "Psicologia" },
  { nome: "A Arte da Guerra", preco: "R$ 27,00", tema: "Estratégia" },
  { nome: "Antifrágil", preco: "R$ 45,00", tema: "Filosofia" },
  { nome: "Meditações", preco: "R$ 29,00", tema: "Filosofia" },
  { nome: "O Lado Difícil das Situações Difíceis", preco: "R$ 39,00", tema: "Negócios" },
];

export default function ProdutoScreen() {
  const [carrinho, setCarrinho] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const adicionarAoCarrinho = (livro) => {
    setCarrinho((prev) => [...prev, livro]);
    Alert.alert("Adicionado", `${livro.nome} foi adicionado ao carrinho`);
  };

  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione livros ao carrinho antes!");
      return;
    }

    setCarrinho([]);
    setModalVisible(false);
    setCompraFinalizada(true);
  };

  return (
    <ImageBackground
      source={{ uri: "https://img.freepik.com/fotos-premium/uma-estante-de-livros-com-muitos-livros-em-um-fundo-preto_889227-4303.jpg" }}
      style={styles.background}
      blurRadius={2}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>📚 Produtos feitos para você</Text>

        {livros.map((livro, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.nome}>{livro.nome}</Text>
            <View style={styles.infoLinha}>
              <Text style={styles.tema}>📘 {livro.tema}</Text>
              <Text style={styles.preco}>{livro.preco}</Text>
            </View>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => adicionarAoCarrinho(livro)}
            >
              <Text style={styles.textoBotao}>+ Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() => setModalVisible(true)}
      >
        <SimpleLineIcons name="basket" size={24} color="#fff" />
        <Text style={styles.textoCarrinho}> Ver Carrinho ({carrinho.length})</Text>
      </TouchableOpacity>

      {/* Modal do Carrinho */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitulo}>Carrinho de Compras</Text>

          {carrinho.length === 0 ? (
            <Text style={styles.vazio}>Carrinho vazio.</Text>
          ) : (
            carrinho.map((item, idx) => (
              <View key={idx} style={styles.itemCarrinho}>
                <Text style={styles.nomeItem}>{item.nome}</Text>
                <Text>{item.preco}</Text>
              </View>
            ))
          )}

          <TouchableOpacity style={styles.finalizarBtn} onPress={finalizarCompra}>
            <Text style={styles.finalizarTexto}>✅ Finalizar Compra</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fecharModal}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "#007BFF", fontSize: 16 }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Mensagem de Sucesso */}
      {compraFinalizada && (
        <View style={styles.sucessoContainer}>
          <Text style={styles.sucessoTitulo}>✅ Compra realizada com sucesso!</Text>
          <Text style={styles.sucessoTexto}>Obrigado por comprar na BookConnect</Text>
          <TouchableOpacity
            style={styles.voltarBtn}
            onPress={() => setCompraFinalizada(false)}
          >
            <Text style={styles.voltarTexto}>Voltar aos produtos</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingBottom: 120,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  infoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tema: {
    fontSize: 14,
    color: "#555",
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  botao: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  botaoCarrinho: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    elevation: 4,
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
    marginBottom: 20,
    textAlign: "center",
  },
  itemCarrinho: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  nomeItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
  finalizarBtn: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 6,
    marginTop: 24,
  },
  finalizarTexto: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  fecharModal: {
    marginTop: 16,
    alignItems: "center",
  },
  vazio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  sucessoContainer: {
    position: "absolute",
    top: "30%",
    left: "5%",
    right: "5%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: "center",
  },
  sucessoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 10,
    textAlign: "center",
  },
  sucessoTexto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  voltarBtn: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  voltarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
