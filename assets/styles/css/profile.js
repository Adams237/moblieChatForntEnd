import { StyleSheet } from 'react-native';
import {colors} from '../colors'
const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  themeIcon: {
        
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contactContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  phoneNumber: {
    flex: 1,
    marginRight: 8,

  },
  editButton: {
    flex: 1,
    backgroundColor :colors.primary,
    width: 200,
    marginTop: 15
  },
   appBar: {
    flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-evenly', marginTop: 6
 },
 appBarTitle: {
    textAlign: 'center',
  
  },
});

export default profileStyle;
