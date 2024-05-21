import  React, { useState  ,  useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {colors} from '../assets/styles/colors'
import SignUpForm from '../components/particular/SignUpForm'
import Loader from '../components/general/Loader'
import MyContext from '../contextes/appContext'
import StepTwo from '../components/particular/SignUp/StepTwo'
import StepTwo2 from '../components/particular/SignUp/StepTwo2'

import StepOne from '../components/particular/SignUp/StepOne'
import StepThree from '../components/particular/SignUp/StepThree'
import StepThree2 from '../components/particular/SignUp/StepThree2'

export const SignUpScreen1 = ()=>{
     return  <StepOne />

}
export const SignUpScreen2 = () => {
       const {globalState , setGlobalState} = useContext(MyContext)

 if(!globalState.connecting){
   return  <StepTwo />
 }else{
   return <Loader message='Création du compte en cours...'/>
 }
};

export const SignUpScreen3 = () => {
    const {globalState , setGlobalState} = useContext(MyContext)

 if(!globalState.connecting){
   return  <StepTwo2 />
 }else{
   return <Loader message='Création du compte en cours...'/>
 }
};

export const SignUpScreen4 = () => {
    const {globalState , setGlobalState} = useContext(MyContext)

 if(!globalState.connecting){
   return  <StepThree />
 }else{
   return <Loader message='Création du compte en cours...'/>
 }
};

export const SignUpScreen5 = () => {
    const {globalState , setGlobalState} = useContext(MyContext)

 if(!globalState.connecting){
   return  <StepThree2 />
 }else{
   return <Loader message='Création du compte en cours...'/>
 }
};


