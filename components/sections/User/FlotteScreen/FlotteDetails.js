import React from 'react';
import { View } from 'react-native';
import HorizMenu from '../../../widgets/HorizMenu';
import CarList from './CarsList';
import FlotteInfos from './FlotteInfos';

function FlotteDetails(props) {
    
  const tabsItemsArray = [
     {
      label: 'Informations générales ',
      component: <FlotteInfos />,
      compte: 'remboursement'

    },
    {
      label: 'Voitures disponibles',
      component: <CarList isGrid={false}/>, 
    },
    {
      label: 'Chauffeurs',
      component: null,

    },
   
     {
      label: 'Avis des clients ',
      component: null,
      compte: 'solidarite'

    }
  ];
    return (
      <View style={{flex: 1}}>
         <HorizMenu tabsItems={tabsItemsArray}/>
      </View>
    );
}

export default FlotteDetails;