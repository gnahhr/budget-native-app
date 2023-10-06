import React from 'react'
import { Tabs, useRouter } from 'expo-router';
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-s.png';

import BookItem from '../../../components/homepage/BookItem';
import books from '../../../constants/books';

const BookIndex = () => {
  const router = useRouter();

  const viewBook = (bookName) => {
    router.push(`/(user)/(books)/${bookName}`)
  };

  return (
    <SafeAreaView>
      <Tabs.Screen 
        options={{
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerShown: true,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerTitle: "",
        }}
      />
      <Text style={{fontWeight: 700, marginLeft: 28, marginVertical: 8, fontSize: 26}}>Financial Literature</Text>
      <View style={{gap: 12}}>
        {books.map(book => <BookItem key={book.name} exert={book.exert} bookImage={book.bookCover} bookName={book.name} onPress={viewBook}/>)}
      </View>
    </SafeAreaView>
  )
}

export default BookIndex