import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBarr = ({title , goBack}) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={goBack}  color="white" />
    <Appbar.Content title={title} titleStyle={{ color: 'white' }}/>
   
  </Appbar.Header>
);

export default AppBarr


































