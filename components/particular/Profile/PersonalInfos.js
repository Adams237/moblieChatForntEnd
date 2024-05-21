import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PersonalInfos({ user }) {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('driverDataA');
        if (dataString !== null) {
          const data = JSON.parse(dataString);
          setDriver(data);
        } else {
          // Gérer le cas où les données ne sont pas trouvées dans AsyncStorage
          //console.log("Les données n'ont pas été trouvées dans AsyncStorage");
        }
      } catch (error) {
        // Gérer les erreurs lors de la récupération des données
        console.error("Une erreur s'est produite lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []); // Exécuter une seule fois au montage

  return (
    <ScrollView>
      <List.Section>
       
        <List.Item
          title="Nom de l'entreprise liée"
          description={'M'}
          left={() => <List.Icon icon="domain" />}
        />
         <List.Item
          title="Numéro d'immatriculation"
          description={ '25411055'}
          left={() => <List.Icon icon="truck" />}
        />
        <List.Item
          title="Nom d'utilisateur"
          description={'Amara'}
          left={() => <List.Icon icon="account" />}
        />
        <List.Item
          title="Nom et Prénoms"
          description={' Gaston MAKOBA'}
          left={() => <List.Icon icon="account" />}
        />
        <Divider />
        <List.Item
          title="Numéro de téléphone"
          description={'+237 99234447'}
          left={() => <List.Icon icon="phone" />}
        />
      </List.Section>
    </ScrollView>
  );
}

export default PersonalInfos;
