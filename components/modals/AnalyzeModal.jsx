import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { analyzeData } from '../../api/insights';
import { AntDesign } from '@expo/vector-icons';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

const AnalyzeModal = ({isModalVisible, setModalVisible}) => {
  const [ overspentItems, setOverspentItems ] = useState(null);
  const { user } = useAuth();
  const { activeBudget } = useBudget();

  const toggleModal = () => {
    setModalVisible(false);
  };


  async function handleGetUsers () {
    const data = await analyzeData(JSON.parse(user).email, activeBudget.budgetName);
    if (data.statusCode === 200) {
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

            <View>
              {overspentItems && overspentItems.map(item => 
                <Text key={item.name}>You have overspent Php. {item.overspent} on {item.name}!</Text> 
                )}
            </View>
            
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: '#ffffff',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    color: '#ffffff',
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default AnalyzeModal