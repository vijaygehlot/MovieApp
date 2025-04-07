import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchUsersRequest } from '../redux/features/user/userSlice'

const UserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;
console.log(users);

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 10 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8 },
  name: { fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default UserList;
