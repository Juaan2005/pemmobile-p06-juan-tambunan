import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* SECTION FOTO */} 
      <Image 
        source={require('../../assets/images/juan.jpg')}
        style={styles.profilePic} 
      />

      {/* SECTION IDENTITAS */}
      <Text style={styles.name}>Juan Moses Tambunan</Text>
      <Text style={styles.nim}>NIM: 243303621215</Text>
      <Text style={styles.jurusan}>Jurusan: Sistem Infromasi</Text>

      {/* SECTION BIO */}
      <View style={styles.bioCard}>
        <Text style={styles.bioText}>
          🚀 Kesuksesan bukan tentang tidak pernah gagal, tapi tentang bangkit
            setiap kali jatuh!
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ecd13',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70, // Bikin jadi bulat
    borderWidth: 3,
    borderColor: '#ffff99',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 5,
  },
  nim: {
    fontSize: 14,
    color: '#ffff99',
    marginBottom: 20,
    letterSpacing: 2,
   },
  jurusan: {
    fontSize: 14,
    color: '#2670ad',
    marginBottom: 20,
    letterSpacing: 2,
  },
  bioCard: {
    backgroundColor: '#038421',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  bioText: {
    color: '#0c0c0c',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});