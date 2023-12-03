import React from 'react'
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Text, ScrollView, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import CustomIcon from '../../../components/common/CustomIcon';
import books from '../../../constants/books';
import LogoS from '../../../assets/logos/logo-s.png';
import LogoSW from '../../../assets/logos/logo-sw.png';
import { useTheme } from '../../../context/theme';
import { COLORS } from '../../../constants/theme';

const bookPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const bookInfo = books.filter(book => book.name === params.bookName)[0];
  const { theme, toggleTheme } = useTheme();

  const backHandler = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.window, theme === 'dark' && styles.darkMode]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['white-700'] : COLORS['dblue-500'] },
          headerShadowVisible: false,
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <Pressable onPress={() => backHandler()}>
              <FontAwesome5 name="backspace" size={24} color={theme === 'light' ? COLORS['blue-400'] : COLORS['white-700']} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => toggleTheme()}>
              <CustomIcon imageUrl={theme === 'light' ? LogoS : LogoSW}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />
      <ScrollView contentContainerStyle={{paddingVertical: 25, flexGrow: 1, paddingBottom: 400}} style={[styles.bookWrapper]}>
        <Image source={bookInfo.bookCover} style={styles.imageStyle}/>
        <Text style={[styles.exertStyle, theme === 'dark' && {color: COLORS['white-700']}]}>"{bookInfo.exert}"</Text>
        <Text style={[styles.contentStyle, theme === 'dark' && {color: COLORS['white-700']}]}>{bookInfo.content}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  window: {
    backgroundColor: COLORS['white-700'],
    flex: 1,
  },
  darkMode: {
    backgroundColor: COLORS['dblue-550'],
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