import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; // Import de la bibliothèque pour le sélecteur de pays
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../../../contextes/appContext';
import { colors } from '../../../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateInfoDriver, updatePassword } from '../../../utils/api';
import Toast from 'react-native-toast-message';
import { err } from 'react-native-svg';
import { isConected, login } from '../../../redurcer/userSlice';

const UpdateProfil = () => {
    const currentUser = useSelector(state => state.currentUser.user)
    const [user, setUser] = useState(currentUser)
    const [err, setErr] = useState({})
    const [update, setUpdate] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()



    const enregistre = async () => {
        try {
            setLoader(true)
            const { data } = await axios.put(`${updateInfoDriver}/${currentUser._id}`, user)
            console.log(data)
            const newUser = {
                ...data,
                password: ""
            }
            dispatch(login(newUser))
            dispatch(isConected())
            Toast.show({
                type: 'success',
                position: 'top',
                text1: "Profil mis à jour avec succès",
                visibilityTime: 2000,
                autoHide: true,
            })
            setLoader(false)
            setUpdate(false)

            //navigation.navigate('Home')
        } catch (error) {
            console.log(error)
            if (error.response) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: error.response.data.message,
                    visibilityTime: 2000,
                    autoHide: true,
                })
                setLoader(false)
                return
            }
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Erreur lors de la mise à jour du profil",
                visibilityTime: 2000,
                autoHide: true,
            })
            setLoader(false)
        }
    }
    const handleChange = (text, value) => {
        setUser({
            ...user,
            [text]: value
        })
    }



    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", color: "red" }} >{err.ancienPassword}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    style={[styles.input, { width: "100%", borderColor: err.ancienPassword ? "red" : '', borderWidth: err.ancienPassword ? 1 : 0 }]}
                    label="Nom et Prenom"
                    value={user.nom}
                    editable={update}
                    onChangeText={(value) => handleChange("nom", value)}
                />
            </View>
            <Text style={{ textAlign: "center", color: "red" }} >{err.newPassword}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    style={[styles.input, { width: "100%", borderColor: err.newPassword ? "red" : '', borderWidth: err.newPassword ? 1 : 0 }]} // Appliquez le nouveau style aux TextInput
                    label="email"
                    value={currentUser.email}
                    editable={false}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    style={[styles.input, { width: "100%", borderColor: err.newPassword ? "red" : '', borderWidth: err.newPassword ? 1 : 0 }]} // Appliquez le nouveau style aux TextInput
                    label="Numéro de téléphone"
                    value={user.phone}
                    editable={update}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    style={[styles.input, { width: "100%", borderColor: err.newPassword ? "red" : '', borderWidth: err.newPassword ? 1 : 0 }]} // Appliquez le nouveau style aux TextInput
                    label="Numéro de la CNI"
                    value={currentUser.cni}
                    editable={false}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    style={[styles.input, { width: "100%", borderColor: err.newPassword ? "red" : '', borderWidth: err.newPassword ? 1 : 0 }]} // Appliquez le nouveau style aux TextInput
                    label="Date de Naissance "
                    value={user.dateNaissance}
                    editable={update}
                />
            </View>

            <TextInput
                style={styles.input}
                label="Imatriculation"
                value={currentUser.imatriculation}
                editable={false}
            />
            <TextInput
                style={styles.input}
                label="Flote"
                value={currentUser.flot.nomFlote? currentUser.flot.nomFlote: currentUser.flot.nom}
                editable={false}
            />


            {!update ?
                <Button mode="contained" onPress={() => {
                    setUpdate(true)
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Modifier</Text>
                </Button> :
                <Button mode="contained" disabled={loader} onPress={enregistre} style={styles.button}>
                    {loader ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Enregistrer</Text>}
                </Button>
            }
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
export default UpdateProfil;
