import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { useAuth } from '../../../context/auth';
import { useBudget } from '../../../context/budget';
import { FontAwesome5 } from '@expo/vector-icons';
import { formatDate } from '../../../utils/dateFunctions';
import { getAllExtraBudget } from '../../../api/budget';
import Button from '../../../components/common/Button';
import ExtraBudgetModal from '../../../components/modals/ExtraBudgetModal';
import { COLORS } from '../../../constants/theme';

const ExtraBudget = () => {
  const { user } = useAuth();
  const { activeBudget } = useBudget();

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ extraList, setExtraList ] = useState([]);

  const router = useRouter();

  const backHandler = () => {
    router.back();
  }

  const modalToggleHandler = () => {
    setIsModalOpen(true);
  }

  async function getAllExtra() {
    const email = JSON.parse(user).email;
    const data = await getAllExtraBudget(email, activeBudget.budgetName);

    setExtraList(data.response);
  }

  useEffect(() => {
    getAllExtra();
  }, [])

  return (
    <View style={[{position: 'relative', alignItems: 'center', height: '100%'}]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "#1579b2"},
          headerShadowVisible: false,
          headerLeft: () => (
            <FontAwesome5 name="backspace" size={24} color="#FFF" onPress={() => backHandler()}/>
          ),
          headerRight: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>EXTRA BUDGETS</Text>
      </View>
      
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
        {extraList && 
        extraList.map(item =>
          <View style={[styles.items]}>
            <Text style={[styles.textWhite, styles.textBold]}>{item.note}</Text>
            <Text style={[styles.textWhite, styles.textBold]}>Php. {item.amount}</Text>
            <Text style={[styles.textWhite, styles.textBold, {flex: 1, textAlign: 'right'}]}>{formatDate(item.dateToBeAdded)}</Text>
          </View>
        )
        }
      </ScrollView>
      <Button label={"Add Extra Budget"} isLoading={false} action={() => modalToggleHandler()}/>
      <ExtraBudgetModal isModalVisible={isModalOpen} setModalVisible={setIsModalOpen} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: '#1579b2',
    width: '100%',
    alignSelf: 'center',
    height: 80,
    // top: '-80%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  items: {
    flexDirection: 'row',
    width: '80%',
    gap: 8,
    backgroundColor: COLORS['blue-500'],
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16,
    margin: 8,
  },
  flexRow: {
    flexDirection: 'row',
  },
  iconStyle: {
    height: 100,
    width: 100, 
    objectFit: 'contain',
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#ffffff'
  },
  textBold: {
    fontWeight: '700',
  },
  textItalics: {
    fontStyle: 'italic',
  },
  textWhite: {
    color: '#ffffff'
  },
  largeFont: {
    fontSize: 25
  },
  buttonWrapper: {
    width: '90%',
  },
  buttonGap: {
    gap: 8,
  },
  textInputStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

export default ExtraBudget