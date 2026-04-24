// components/ProductCard.js — kartu produk (mendukung mode list & grid)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ item, onPress, viewMode = 'list' }) => {
  const isGrid = viewMode === 'grid';

  return (
    <TouchableOpacity
      style={[styles.card, isGrid ? styles.cardGrid : styles.cardList]}
      onPress={() => onPress(item)}
      activeOpacity={0.85}
    >
      {/* Emoji sebagai pengganti gambar */}
      <View style={[styles.imageContainer, isGrid && styles.imageContainerGrid]}>
        <Text style={[styles.emoji, isGrid && styles.emojiGrid]}>{item.image}</Text>
      </View>

      {/* Info produk */}
      <View style={[styles.info, isGrid && styles.infoGrid]}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.sold}>{item.sold.toLocaleString('id-ID')} terjual</Text>
        </View>

        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  // Mode list — horizontal
  cardList: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 6,
  },
  // Mode grid — vertical (2 kolom)
  cardGrid: {
    flex: 1,
    margin: 6,
  },
  imageContainer: {
    width: 72,
    height: 72,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  imageContainerGrid: {
    width: '100%',
    height: 110,
    marginRight: 0,
    marginBottom: 10,
  },
  emoji: { fontSize: 36 },
  emojiGrid: { fontSize: 56 },
  info: { flex: 1 },
  infoGrid: { flex: 0 },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 20,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  rating: { fontSize: 12, color: '#f59e0b', fontWeight: '600' },
  sold: { fontSize: 11, color: '#9ca3af' },
  price: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
});

export default ProductCard;
