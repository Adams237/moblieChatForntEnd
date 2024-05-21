import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { items } from '../components/particular/DrawerMenu';
import MyContext from '../contextes/appContext';
import { colors } from '../assets/styles/colors';
import { Switch } from 'react-native-paper';
import { singIn } from '../utils/api';
import { useDispatch } from 'react-redux';
import { isConected, login } from '../redurcer/userSlice';


const {width , height} = Dimensions.get('window')
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

  const navigation = useNavigation()
  const handleLogin = async () => {
    setLoading(true);
    const userData = {
      email: email, 
      password: password, 
    };

      try {
      // Effectuer la requête POST avec Axios
      const response = await axios.post(singIn, userData);
      //  console.log(response);
       const data = response.data
        dispatch(login(data))
        dispatch(isConected())
        setLoading(false)
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
         setLoading(false)
      } else {
        alert(error.message);
      }
      console.error("Error:", errorMessage);
    }
    setLoading(false);

    setGlobalState((prevStae)=>({
      ...prevStae, 
      connected: true
    }))
  };
const [isAgreed, setIsAgreed] = useState(false);
  const [btnBg, setBtnBg] = useState('rgb(212, 210, 210)');

  return (
    <View style={styles.container}>
      <TextInput
        label="Adresse mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Mot de passe"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
       <View style={styles.switchContainer}>
      <Switch
        value={isAgreed}
        onValueChange={() => {
          setIsAgreed(!isAgreed)
                setBtnBg(isAgreed ? 'rgb(212, 210, 210)' : colors.primary);

        }}
      />
      <Text style={styles.switchText}>
        J'accepte les règles de la <Text style={{color: colors.primary}}
        onPress={()=>{
          navigation.navigate("charte de la communauté Ride 2 School")
        }}
        >
          charte de la communauté Ride 2 School
        </Text>
      </Text>
    </View>
      <Button mode="contained" onPress={handleLogin}         style={[styles.button, { backgroundColor: btnBg }]}
disabled={loading||!isAgreed}>
        <Text style={{ color: 'white' }}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
   borderRadius: 20, 
    padding: 5, 
    marginVertical: 4, 
    
    },


     switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchText: {
    marginLeft: 0,
    fontSize: 16,
    padding: 10, 
    width: width*0.8
  },
});

export default SignInScreen;
