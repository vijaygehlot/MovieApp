import { Text, View, StyleSheet } from 'react-native'


const App = () => {

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black' }}>App</Text>
    </View>
  )

}

export default App;

const styles = StyleSheet.create(({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
}))

