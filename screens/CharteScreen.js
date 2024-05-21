import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const CharterScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Charte de la communauté Ride 2 School (R2S)</Text>
      
      <Text style={styles.sectionTitle}>Principes généraux :</Text>
      <Text>- La sécurité des enfants et le respect mutuel entre adultes est une affaire de tous-tes.</Text>
      <Text>- Vous devez traiter tout le monde avec bienveillance et respect.</Text>
      <Text>- Vous devez éviter de faire des demandes spéciales au chauffeur.</Text>
      <Text>- Vous devez respecter le code de la route et la loi.</Text>
      <Text>- Vous devez éviter de surcharger le véhicule et faire des arrêts autres que ceux prévus pendant la période de prestation.</Text>
      <Text>- Vous devez être ponctuels.</Text>

      <Text style={styles.sectionTitle}>Les 8 principes de la Charte :</Text>
      <Text style={styles.principleTitle}>1. Avoir une conduite sûre :</Text>
      <Text>- Respecter le code de la route.</Text>
      <Text>- Ne jamais utiliser son téléphone au volant.</Text>
      <Text>- Ne jamais transporter des enfants ou autres personnes en plus que ceux autorisés dans le véhicule pendant les trajets scolaires.</Text>
      <Text>- Avoir une voiture aux normes et bien entretenue.</Text>

      {/* Répétez la structure pour les autres principes... */}

      <Text style={styles.sectionTitle}>La gestion des incidents :</Text>
      <Text>
        Le retour d'un passager sur une violation de l'un de ces principes peut mener lieu, dans de rares cas, à une suspension préventive du compte d'un chauffeur partenaire. Après collecte d'informations auprès du passager et du chauffeur, et étude de la situation, le compte peut être réactivé ou désactivé du réseau Bëtacar Drive.
      </Text>
      <Text>
        Par ailleurs, en cas d'incident avec un utilisateur, ou si un utilisateur a oublié un objet dans le véhicule, nous conseillons aux chauffeurs de contacter son HUB après le trajet via l'application.
      </Text>
      <Text>
        Si vous avez des questions ou rencontrez une difficulté, l’équipe Bëtacar Drive est à votre écoute à tout moment via le lien aide.betacardrive.com
      </Text>
      <View style={{height: 120}}>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  principleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
});

export default CharterScreen;
