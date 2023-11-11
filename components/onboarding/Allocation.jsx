import React, { useState, useEffect, useRef} from 'react'
import { View, Alert, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { getIcon } from '../../constants/icons';
import { Icon } from '@rneui/themed';


const Allocation = ({category, curAllocation, allocationHandler, iconId, checkExceeding}) => {
  const [ allocation, onChangeAllocation ] = useState(curAllocation);
  const [ icon, setIcon ] = useState(null);
  const inputRef = useRef();

  const onChangeHandler = (e) => {
    const allo = Number(e)

    if (allo < 0) {
      Alert.alert('Warning', `You can't input a negative value!`, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
      onChangeAllocation(allo * -1);
      return;
    }

    // Check niya if exceeded na yung ina-allocate niya sa max budget niya
    if (checkExceeding(curAllocation, allo)) {
      if (!allocationHandler(category, allo)) {
        onChangeAllocation(allo);
      }
    } else {
      onChangeAllocation(allo);
    }
  }

  const onFocusHandler = () => {
    if (checkExceeding){
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    setIcon(getIcon(iconId));
    onChangeAllocation(curAllocation);
  }, [])

  useEffect(() => {
    onChangeAllocation(curAllocation);
  }, [curAllocation])

  return (
    <View style={styles.main}>
      {icon ?
        <View style={styles.iconStyle}>{icon}</View> 
        :
        <Icon
            name='wifi'
            type='font-awesome'
            color='#ffffff'
            style={styles.iconStyle}
            />
        }
      <Pressable style={{flex: 1}} onPress={() => onFocusHandler()}>
        <Text style={[styles.topText, styles.whiteText]}>{category}</Text>
        <View style={styles.sideBySide}>
          <Text style={[styles.bottomText, styles.whiteText]}>Php. </Text>
          {checkExceeding ? 
            <TextInput
              placeholder="0"
              value={String(allocation)}
              inputMode='numeric'
              onChangeText={onChangeHandler}
              style={[styles.bottomText, styles.whiteText]}
              ref={inputRef}
              />
            :
            <Text style={[styles.bottomText, styles.whiteText]}>{allocation}</Text>
          }
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "70%",
    alignSelf: 'center',
    backgroundColor: '#5cafc9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4
  },
  sideBySide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 3,
    marginRight: 6,
  },
  whiteText: {
    color: "#ffffff",
  },
  topText: {
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'flex-start',
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  bottomText: {
    fontSize: 11,
  }
});

export default Allocation