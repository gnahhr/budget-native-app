import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/theme';
import { getBudgetUsers, addBudgetUser, removeBudgetUser } from '../../api/budget';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';
import Button from '../common/Button';

const RequestAccessModal = ({isModalVisible, setModalVisible}) => {
  const [ userList, setUserList ] = useState([]);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userEmail, setUserEmail ] = useState("");
  const [ activeUser, setActiveUser ] = useState("");

  const toggleModal = () => {
    setModalVisible(false);
    setIsEdit(false);
  };

  const { user } = useAuth();
  const { activeBudget } = useBudget();

  async function handleGetUsers () {
    
    const data = await getBudgetUsers(JSON.parse(user).email, activeBudget.budgetName);
    setUserList(data.response);
    setActiveUser(JSON.parse(user).username);
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

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={styles.modalWrapper}>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Request Access</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>       
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
                  <Text>{user.userName}</Text>

                  <View>
                    
                  </View>
                </View>)}
              </View>
              <Button label={"Edit Userlist"} action={() => setIsEdit(!isEdit)} />
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

export default RequestAccessModal