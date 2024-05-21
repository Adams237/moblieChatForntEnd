import React, { useState } from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import { View, StyleSheet , Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import {colors} from '../../../assets/styles/colors'

const ChoixPreferenceForm  = () => {
const [check1, setCheck1] = useState(false);
const [check2, setCheck2] = useState(false);
const [check3, setCheck3] = useState(false);
const [check4, setCheck4] = useState(false);

return (
  <View style={styles.container}>
    <CheckBox
      center
      title="Aller-Retour "
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={check1}
      onPress={() => setCheck1(!check1)}
    />

    <CheckBox
      center
      title="Aller unique "
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={check2}
      onPress={() => setCheck2(!check2)}
    />

    <CheckBox
      center
         title="Retour unique "
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={check3}
      onPress={() => setCheck3(!check3)}
    />
       <Button mode="contained" style={styles.button}>
         <Text style={{color: 'white'}}>Enrégister</Text> 
      </Button>
  </View>
);
};

export default ChoixPreferenceForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 10,
  },
   button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
        color: 'white'

  },
});