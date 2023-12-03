import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, Pressable} from 'react-native';

import { getBudgetUsers, addBudgetUser, requestAccess, removeBudgetUser } from '../../api/budget';

import { COLORS } from '../../constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';

import Modal from 'react-native-modal';
import Button from '../common/Button';
import RequestAccessModal from './RequestAccessModal';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';
import { useTheme } from '../../context/theme';

const UserListModal = ({isModalVisible, setModalVisible}) => {
  const [ userList, setUserList ] = useState([]);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userEmail, setUserEmail ] = useState("");
  const [ activeUser, setActiveUser ] = useState("");
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const toggleModal = () => {
    setModalVisible(false);
    setIsEdit(false);
  };

  const { user } = useAuth();
  const { activeBudget } = useBudget();
  const { theme } = useTheme();

  async function handleGetUsers () {
    
    const data = await getBudgetUsers(JSON.parse(user).email, activeBudget.budgetName);
    setUserList(data.response);
    setActiveUser(JSON.parse(user).username);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  async function addUserHandler() {
    setIsLoading(true);

    const data = await addBudgetUser(JSON.parse(user).email, activeBudget.budgetName, userEmail);

    setIsLoading(false);
    if (data.statusCode === 200) {
      handleGetUsers();
      setUserEmail("");
    } else {
      Alert.alert('Warning', data.message, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
    }
  }

  async function requestAccessHandler() {
    setIsLoading(true);

    const data = await requestAccess(JSON.parse(user).email, userEmail);

    setIsLoading(false);
    if (data.statusCode === 200) {
      handleGetUsers();
      Alert.alert('Success!', data.message, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
      setUserEmail("");
    } else {
      Alert.alert('Warning', data.message, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
    }
  }

  async function removeUserHandler(userName, userEmail) {
    if (isLoading) return;

    Alert.alert(
      "Warning!",
      `Are you sure you want to remove ${userName} to the budget?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setIsLoading(true);
            const data =  await removeBudgetUser(JSON.parse(user).email, activeBudget.budgetName, userEmail);
            setIsLoading(false);

            if (data.statusCode === 200) {
              Alert.alert("User removed successfully");
              handleGetUsers();
            } else {
              Alert.alert(data.message);
            }
          },
          style: 'default',
        },
      ],
      {
        text: 'Continue',
      },
    );
  }

  useEffect(() => {
    if (user) {
      handleGetUsers();
    }
  }, [user, activeBudget]);

  useEffect(() => {
    setUserEmail("");
  }, [isEdit])

  return (
    <>
    {isModalOpen ?
    <RequestAccessModal isModalVisible={isModalOpen} setModalVisible={setIsModalOpen} />
      :
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={[styles.modalWrapper, theme === 'dark' && styles.darkMode]}>
            <View style={[styles.modalHeader]}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:8}}>
                <Text style={[styles.textBold, styles.textHeader, theme === 'dark' && styles.textWhite]}>User List</Text>
                <Pressable onPress={() => openModal()}>
                  <Text style={{backgroundColor: COLORS['blue-500'], borderRadius: 8, padding: 8, color: COLORS['white-500']}}>Check Requests</Text>
                </Pressable>
              </View>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            {isEdit ? 
            <View>
              <ScrollView
                  contentContainerStyle={{
                    gap: 8,
                  }}
                  style={{
                    marginVertical: 8,
                    maxHeight: '80%',
                  }}>  
                {userList && userList.map((item, idx) =>
                <View key={idx} style={{alignItems: 'center', flexDirection: 'row'}}>
                  <View style={{alignItems: 'center', flexDirection: 'row', gap: 8, flex: 1}}>
                    <Image source={`https:${item.Images.split(":")[1]}`} style={{width: 40, height: 40, borderRadius: 50, justifyContent: 'center'}}/>
                    <Text style={[theme === 'dark' && styles.textWhite]}>{item.userName}</Text>
                  </View>
                  {(item.userName !== activeUser && !(item.Email === activeBudget.budgetOwner) && (activeBudget.budgetOwner === JSON.parse(user).email)) && 
                  <Pressable onPress={() => removeUserHandler(item.userName, item.Email)}>
                    <View style={{width: 30, height:30, backgroundColor: COLORS['red-500'], borderRadius:8, alignItems: 'center', justifyContent: 'center'}}>
                      <AntDesign name="deleteuser" size={24} color={COLORS['white-500']} />
                    </View>
                  </Pressable>
                  }
                </View>)}
              </ScrollView>
              <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: 4,
                    }}>
                <TextInput placeholder='Enter user email address...' value={userEmail} onChangeText={setUserEmail}/>
                <Button label={"Add User"} action={() => addUserHandler()} isLoading={isLoading} active={userEmail !== ""}/>
              </View>
            </View>
            :
            <View>
              <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 16,
                    borderBottomColor: 'black',
                    borderBottomWidth: 4,
                    paddingVertical: 16,
                  }}>  
                {userList && userList.map((user, idx) =>
                <View key={idx} style={{alignItems: 'center'}}>
                  <Image source={`https:${user.Images.split(":")[1]}`} style={{width: 65, height: 65, borderRadius: 50, justifyContent: 'center'}}/>
                  <Text style={[theme === 'dark' && styles.textWhite]}>{user.userName}</Text>
                </View>)}
              </View>
              <View style={{
                    borderTopColor: 'black',
                    borderTopWidth: 4,
                    }}>
                <TextInput
                  placeholder='Enter user email address...'
                  value={userEmail}
                  onChangeText={setUserEmail}
                  backgroundColor={theme === 'dark' && COLORS['grey-500']}
                  color={theme === 'dark' && COLORS['white-700']}
                  placeholderTextColor={theme === 'dark' && COLORS['grey-300']}/>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1,}}>
                <Button label={"Edit Userlist"} action={() => setIsEdit(!isEdit)}/>
                <Button label={"Request Access"} action={() => requestAccessHandler()} active={userEmail !== ""}/>
              </View>
            </View>
            }
        </View>
    </Modal>
    }
    </>
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
  darkMode: {
    backgroundColor: COLORS['dblue-550'],
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