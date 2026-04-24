// screens/HomeScreen.js — halaman utama ShopList
// Memenuhi: R1–R6 + E1 (filter kategori) + E2 (toggle grid/list) + E4 (sort)
import React, { useState, useMemo, useCallback } from 'react';
import {
  View, Text, FlatList, Alert, StatusBar, StyleSheet,
  SafeAreaView, ScrollView, TouchableOpacity, RefreshControl,
} from 'react-native';

import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

// Opsi sort untuk E4
const SORT_OPTIONS = [
  { key: 'default',     label: 'Default' },
  { key: 'price-asc',   label: 'Harga ↑' },
  { key: 'price-desc',  label: 'Harga ↓' },
  { key: 'rating-desc', label: 'Rating ★' },
];

export default function HomeScreen() {
  // ===== STATE =====
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // E1
  const [sortBy, setSortBy] = useState('default');                   // E4
  const [viewMode, setViewMode] = useState('list');                  // E2: 'list' | 'grid'
  const [products, setProducts] = useState(PRODUCTS);                // untuk pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);               // R6

  // ===== FILTER + SEARCH + SORT (digabung di useMemo biar efisien) =====
  const filteredProducts = useMemo(() => {
    let list = products;

    // 1) Filter kategori (E1)
    if (selectedCategory !== 'Semua') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2) Search by name / category (R5 — real-time)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 3) Sort (E4)
    if (sortBy === 'price-asc')   list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc')  list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating-desc') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // ===== HANDLERS =====
  const handleProductPress = (product) => {
    Alert.alert(product.name, `Harga: Rp ${product.price.toLocaleString('id-ID')}`);
  };

  // R6 — Pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));      // simulasi fetch ulang
    setProducts([...PRODUCTS].sort(() => Math.random() - 0.5));
    setRefreshing(false);
  }, []);

  // Daftar kategori untuk chip filter
  const allCategories = ['Semua', ...CATEGORIES];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>SHOPLIST</Text>
            <Text style={styles.headerTitle}>🛍️ Toko Juan Store</Text>
          </View>
          {/* E2 — Toggle list/grid */}
          <View style={styles.viewToggle}>
            <TouchableOpacity
              onPress={() => setViewMode('list')}
              style={[styles.viewBtn, viewMode === 'list' && styles.viewBtnActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.viewIcon, viewMode === 'list' && styles.viewIconActive]}>≡</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode('grid')}
              style={[styles.viewBtn, viewMode === 'grid' && styles.viewBtnActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.viewIcon, viewMode === 'grid' && styles.viewIconActive]}>▦</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.resultInfo}>
          Menampilkan{' '}
          <Text style={styles.resultAccent}>{filteredProducts.length}</Text> dari{' '}
          {products.length} produk
        </Text>

        {/* R5 — Search bar */}
        <View style={{ marginTop: 12 }}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>
      </View>

      {/* ===== FILTER & SORT ===== */}
      <View style={styles.filtersWrap}>
        {/* E1 — Chip kategori */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {allCategories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* E4 — Tombol sort */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortRow}
        >
          {SORT_OPTIONS.map((opt) => {
            const active = sortBy === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                onPress={() => setSortBy(opt.key)}
                activeOpacity={0.8}
                style={[styles.sortBtn, active && styles.sortBtnActive]}
              >
                <Text style={[styles.sortText, active && styles.sortTextActive]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ===== FLATLIST (R1, R2, R3, R4, R6, E2) ===== */}
      <FlatList
        key={viewMode}                                             // re-render saat numColumns berubah
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}                   // R3 — id string
        numColumns={viewMode === 'grid' ? 2 : 1}                   // E2
        columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
        renderItem={({ item }) => (
          <ProductCard
            item={item}                                            // R2 — komponen terpisah
            onPress={handleProductPress}
            viewMode={viewMode}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          filteredProducts.length === 0 && { flexGrow: 1 },
        ]}
        // R4 — Empty state informatif
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Produk tidak ditemukan</Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? `Tidak ada hasil untuk "${searchQuery}". Coba kata kunci lain atau kategori berbeda.`
                : 'Coba ubah kategori atau reset filter.'}
            </Text>
            <Text style={styles.emptyHint}>💡 Tarik ke bawah untuk refresh data</Text>
          </View>
        )}
        // R6 — Pull-to-refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#6366f1"
            colors={['#6366f1']}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

  // Header
  header: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTop: { flexDirection: 'row', alignItems: 'flex-start' },
  brand: { color: '#c7d2fe', fontSize: 11, letterSpacing: 3, fontWeight: '700' },
  headerTitle: { color: '#ffffff', fontSize: 22, fontWeight: '800', marginTop: 4 },
  resultInfo: { color: '#e0e7ff', fontSize: 13, marginTop: 8 },
  resultAccent: { color: '#fde68a', fontWeight: '700' },

  // Toggle list/grid
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    padding: 3,
  },
  viewBtn: {
    width: 36,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  viewBtnActive: { backgroundColor: '#ffffff' },
  viewIcon: { fontSize: 14, color: '#ffffff', fontWeight: '700' },
  viewIconActive: { color: '#4f46e5' },

  // Filter & sort
  filtersWrap: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  chipRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  chipText: { fontSize: 13, color: '#111827', fontWeight: '500' },
  chipTextActive: { color: '#ffffff' },

  sortRow: { paddingHorizontal: 16, paddingBottom: 10, gap: 6 },
  sortBtn: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortBtnActive: { backgroundColor: '#fde68a', borderColor: '#fbbf24' },
  sortText: { fontSize: 12, color: '#6b7280', fontWeight: '600' },
  sortTextActive: { color: '#78350f' },

  // List
  listContent: { paddingTop: 8, paddingBottom: 32 },
  gridRow: { paddingHorizontal: 10 },

  // Empty state
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyEmoji: { fontSize: 56, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  emptyText: { fontSize: 13, color: '#6b7280', textAlign: 'center', marginTop: 6 },
  emptyHint: { fontSize: 12, color: '#9ca3af', marginTop: 12 },
});
