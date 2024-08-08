import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; // Import de la bibliothèque pour le sélecteur de pays
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../../../contextes/appContext';
import { colors } from '../../../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { updatePassword } from '../../../utils/api';
import Toast from 'react-native-toast-message';
import { err } from 'react-native-svg';

const UpDateForm = () => {
  const currentUser = useSelector(state => state.currentUser.user)
  const [user, setUser] = useState({})
  const [err, setErr] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loader, setLoader] = useState(false)

  const changeShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const changeShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
  }
  const handleChange = (text, value) => {
  
    if (text === "newPassword") {
      if (value.length < 8) {
        console.log("ici")
        console.log(err)
        setErr({
          ...err,
          newPassword: "Le mot de passe doit contenir au moins 8 carractères"
        })
      }
      else {
        setErr({
          ...err,
          newPassword: null
        })
      }

    }
    setUser({
      ...user,
      [text]: value
    })
  }

  const updatePasswords = async () => {
    setLoader(true)
    if(!user.ancienPassword || !user.newPassword){
      Toast.show({
        type: 'error',
        position: 'top',
        text1: "Veiller remplir tous les champs",
        visibilityTime: 2000,
        autoHide: true,
      })
      setLoader(false)
      return
    }
    if(user.newPassword !== user.confirmPassword){
      Toast.show({
        type: 'error',
        position: 'top',
        text1: "les mots de passe ne correspondent pas",
        visibilityTime: 2000,
        autoHide: true,
      })
      setLoader(false)
      return
    }
    if(err.newPassword || err.ancienPassword){
      Toast.show({
        type: 'error',
        position: 'top',
        text1: err.newPassword || err.ancienPassword,
        visibilityTime: 2000,
        autoHide: true,
      })
      setLoader(false)
      return
    }
    try {
      const { data } = await axios.post(`${updatePassword}/${currentUser._id}`, {
        ancienPassword: user.ancienPassword,
        newPassword: user.newPassword
      })
      Toast.show({
        type: 'success',
        position: 'top',
        text1: data.message,
        visibilityTime: 2000,
        autoHide: true,
      })
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(false)
      if (error.response) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: error.response.data.message,
          visibilityTime: 2000,
          autoHide: true,
        })
        return
      }
      Toast.show({
        type: 'error',
        position: 'top',
        text1: "une erreur est survenue",
        visibilityTime: 2000,
        autoHide: true,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", color: "red" }} >{err.ancienPassword}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={[styles.input, { width: "100%", borderColor: err.ancienPassword ? "red" : '', borderWidth: err.ancienPassword ? 1 : 0 }]}
          label="Ancien mot de passe"
          secureTextEntry={!showPassword}
          onChangeText={(value) => handleChange("ancienPassword", value)}
        />
        <TouchableOpacity onPress={changeShowPassword} style={{ position: "absolute", right: 10, }} >

          {!showPassword ? <Entypo name="eye-with-line" size={20} color="gray" /> :
            <Icon name='eye' size={20} color="gray" />}
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "center", color: "red" }} >{err.newPassword}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={[styles.input, { width: "100%", borderColor: err.newPassword ? "red" : '', borderWidth: err.newPassword ? 1 : 0 }]} // Appliquez le nouveau style aux TextInput
          label="Nouveau mot de Passe"
          secureTextEntry={!showNewPassword}

          onChangeText={(value) => handleChange("newPassword", value)}
        />
        <TouchableOpacity onPress={changeShowNewPassword} style={{ position: "absolute", right: 10, }} >

          {!showNewPassword ? <Entypo name="eye-with-line" size={20} color="gray" /> :
            <Icon name='eye' size={20} color="gray" />}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        label="Confirmer le nouveau mot de passe"
        secureTextEntry={true}
        onChangeText={(value) => handleChange("confirmPassword", value)}
      />


      <Button mode="contained" disabled={loader} onPress={updatePasswords} style={styles.button}>
        {loader ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Modifier</Text>}
      </Button>
      <Toast position='top' />
    </View>
  );
};

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    marginLeft: 8,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary, // Couleur du bouton
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Exportez le composant
export default UpDateForm;
