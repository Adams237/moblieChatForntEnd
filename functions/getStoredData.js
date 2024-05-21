import AsyncStorage from '@react-native-async-storage/async-storage';


export const getData =  async (dataKey)=> {
       try {
      // Récupérer les données précédemment stockées dans AsyncStorage
      const formDataString = await AsyncStorage.getItem(dataKey);
      const formData = JSON.parse(formDataString);
       return formData 
    
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
}