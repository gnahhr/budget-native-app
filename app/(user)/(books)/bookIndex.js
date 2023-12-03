import React from 'react'
import { Tabs, useRouter } from 'expo-router';
import { Text, View, Pressable, SafeAreaView } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-s.png';
import LogoSW from '../../../assets/logos/logo-sw.png';

import BookItem from '../../../components/homepage/BookItem';
import books from '../../../constants/books';
import { useTheme } from '../../../context/theme';
import { COLORS } from '../../../constants/theme';

const BookIndex = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const viewBook = (bookName) => {
    router.push(`/(user)/(books)/${bookName}`)
  };

  return (
    <SafeAreaView style={[{ backgroundColor: theme === 'light' ? COLORS['white-700'] : COLORS['dblue-500'] }, {flex: 1}]}>
      <Tabs.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['white-700'] : COLORS['dblue-500'] },
          headerShadowVisible: false,
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => toggleTheme()}>
              <CustomIcon imageUrl={theme === 'light' ? LogoS : LogoSW}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />
      <Text style={[{fontWeight: 700, marginLeft: 28, marginVertical: 8, fontSize: 26}, theme === 'dark' && {color: COLORS['white-700']}]}>Financial Literature</Text>
      <View style={{gap: 12}}>
        {books.map(book => <BookItem key={book.name} exert={book.exert} bookImage={book.bookCover} bookName={book.name} onPress={viewBook}/>)}
      </View>
    </SafeAreaView>
  )
}

export default BookIndex