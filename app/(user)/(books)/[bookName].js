import React from 'react'
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Text, ScrollView, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import CustomIcon from '../../../components/common/CustomIcon';
import books from '../../../constants/books';
import LogoS from '../../../assets/logos/logo-s.png';

const bookPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const bookInfo = books.filter(book => book.name === params.bookName)[0];

  const backHandler = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.window]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "white"},
          headerShadowVisible: false,
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <Pressable onPress={() => backHandler()}>
              <FontAwesome5 name="backspace" size={24} color="#1e9dc5" />
            </Pressable>
          ),
          headerRight: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerTitle: "",
        }}
      />
      <ScrollView contentContainerStyle={{paddingVertical: 25, flexGrow: 1, paddingBottom: 400}} style={[styles.bookWrapper]}>
        <Image source={bookInfo.bookCover} style={styles.imageStyle}/>
        <Text style={styles.exertStyle}>"{bookInfo.exert}"</Text>
        <Text style={styles.contentStyle}>{bookInfo.content}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  window: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  bookWrapper: {
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  exertStyle: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 8,
    fontStyle: 'italic',
  },
  contentStyle: {
  },
  imageStyle: {
    width: '30%',
    height: '30%',
    aspectRatio: '4/6',
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 8,
  }
})

export default bookPage