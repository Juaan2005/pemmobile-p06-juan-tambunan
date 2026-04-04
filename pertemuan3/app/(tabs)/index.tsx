import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from "react-native";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: "Rp 1.200.000", emoji: "🎧", discount: true },
  { id: 2, name: "Smartwatch", price: "Rp 950.000", emoji: "⌚", discount: false },
  { id: 3, name: "Portable Speaker", price: "Rp 500.000", emoji: "🔊", discount: false },
  { id: 4, name: "Power Bank 20000mAh", price: "Rp 300.000", emoji: "🔋", discount: false },
];

function ProductCard({ product, cardWidth }: { product: typeof PRODUCTS[0]; cardWidth: number }) {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      {product.discount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>20% OFF</Text>
        </View>
      )}
      <Text style={styles.cardEmoji}>{product.emoji}</Text>
      <Text style={styles.cardName}>{product.name}</Text>
      <Text style={styles.cardPrice}>{product.price}</Text>
      <View style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Add to Cart</Text>
      </View>
    </View>
  );
}

export default function Index() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  const numColumns = isLandscape ? 4 : 2;

  const PADDING = 16;
  const GAP = 12;

  const cardWidth =
    (width - PADDING * 2 - GAP * (numColumns - 1)) / numColumns - 1;

  const rows: typeof PRODUCTS[] = [];
  for (let i = 0; i < PRODUCTS.length; i += numColumns) {
    rows.push(PRODUCTS.slice(i, i + numColumns));
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>OFFICIAL STORE</Text>
        <Text style={styles.headerTitle}>TechGears Store</Text>
        <Text style={styles.headerSub}>Gear up your workspace 🚀</Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={[styles.catalog, { paddingHorizontal: PADDING }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Produk Pilihan</Text>

        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={[styles.row, { gap: GAP }]}>
            {row.map((product) => (
              <ProductCard key={product.id} product={product} cardWidth={cardWidth} />
            ))}
          </View>
        ))}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>©️ 2026 TechGears Store</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 52,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#1A1A1A",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },

  headerLabel: {
    fontSize: 10,
    color: "#1DB954",
    letterSpacing: 3,
    fontWeight: "700",
    marginBottom: 4,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },

  headerSub: {
    fontSize: 13,
    color: "#888888",
    marginTop: 4,
  },

  catalog: {
    paddingTop: 20,
    paddingBottom: 32,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 14,
  },


  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    position: "relative",
  },

  cardEmoji: {
    fontSize: 36,
    marginBottom: 10,
    marginTop: 8,
  },

  cardName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  cardPrice: {
    fontSize: 12,
    color: "#1DB954",
    fontWeight: "600",
    marginBottom: 12,
  },

  buyButton: {
    backgroundColor: "#1DB954",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
  },

  buyButtonText: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "800",
  },

  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },

  footer: {
    marginTop: 24,
    alignItems: "center",
  },

  footerText: {
    fontSize: 11,
    color: "#444444",
  },
});