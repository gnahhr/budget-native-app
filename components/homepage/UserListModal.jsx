import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import { getBudgetUsers, addBudgetUser } from '../../api/budget';
import { AntDesign } from '@expo/vector-icons';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';
import Button from '../common/Button';

const UserListModal = ({isModalVisible, setModalVisible}) => {
  const [ userList, setUserList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userEmail, setUserEmail ] = useState("");

  const toggleModal = () => {
    setModalVisible(false);
  };

  const { user } = useAuth();
  const { activeBudget } = useBudget();

  async function handleGetUsers () {
    
    const data = await getBudgetUsers(JSON.parse(user).email, activeBudget.budgetName);
    setUserList(data.response);
  }

  async function addUserHandler() {
    setIsLoading(true);

    const data = await addBudgetUser(JSON.parse(user).email, activeBudget.budgetName, userEmail);
    setIsLoading(false);
    if (data.statusCode === 200) {
      handleGetUsers();
    } else {
      Alert.alert('Warning', data.message, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
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
              <Text style={[styles.textBold, styles.textHeader]}>User List</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 16,
                  borderBottomColor: 'black',
                  borderBottomWidth: 4,
                  paddingVertical: 16,
                }}>  
              {userList && userList.map((user, idx) =>
              <View key={user} style={{width: 75, height: 75, backgroundColor: '#5087B9', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
                <Text key={idx}>{user}</Text>
              </View>)}
            </View>

            <View>
              <TextInput placeholder='Enter user email address...' value={userEmail} onChangeText={setUserEmail}/>
              <Button label={"Add User"} action={() => addUserHandler()} isLoading={isLoading} />
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

export default UserListModal