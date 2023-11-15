import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { analyzeData } from '../../api/insights';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

const AnalyzeModal = ({isModalVisible, setModalVisible}) => {
  const [ overspentItems, setOverspentItems ] = useState(null);
  const [ ifEmergencyFundsExist, setIsEmergencyFundsExist ] = useState(false);
  const { user } = useAuth();
  const { activeBudget } = useBudget();

  const toggleModal = () => {
    setModalVisible(false);
  };


  async function handleGetUsers () {
    const data = await analyzeData(JSON.parse(user).email, activeBudget.budgetName);
    
    if (data.statusCode === 200) {
      setIsEmergencyFundsExist(data.response.isEmergencyFundsExist);
      setOverspentItems(data.response.overspentItems);
    }
  }


  useEffect(() => {
    if (user) {
      handleGetUsers();
    }
  }, [user, activeBudget]);

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={styles.modalWrapper}>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Analyze</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{marginTop: 8, gap: 8}}>
              {overspentItems && overspentItems.length > 0 ?
                <>
                <ScrollView contentContainerStyle={{gap: 8}}>
                  <Text style={[styles.textBold, {fontSize: 24}]}>Overspent</Text>
                  {overspentItems.map(item => 
                    <View key={item.name} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 20, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)'}}>
                      <View style={{flex: 1}}>
                        <Text style={[styles.textWhite, styles.textBold]}>{item.name}</Text>
                        <Text style={[styles.textWhite]}>{item.category}</Text>
                      </View>
                      <Text style={[styles.textWhite, styles.textRed]}>Php. {item.overspent}</Text>
                    </View>
                    // <Text key={item.name}>You have overspent <Text style={{fontWeight: '700'}}>Php. {item.overspent}</Text> on {item.name}!</Text> 
                  )}
                </ScrollView>

                {ifEmergencyFundsExist ?
                  <Text style={{textAlign: 'center', color: 'red', marginTop: 10}}>Allocate your expenses to the Emergency Fund.</Text>
                  :
                  <Text style={{textAlign: 'center', color: 'red', marginTop: 10}}>It is advised that you get an Emergency Fund for your expenses.</Text>}
                </>
              :
              <Text style={[styles.textHeader, styles.textCenter, styles.textBold]}>You're doing great!</Text>}
            </View>
            
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: COLORS['white-500'],
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 8,
    overflow: 'scroll'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  textBold: {
    fontWeight: '700',
  },
  textHeader: {
    fontSize: 25,
  },
  textWhite: {
    color: COLORS['white-500'],
  },
  textRed: {
    color: COLORS['red-500'],
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default AnalyzeModal