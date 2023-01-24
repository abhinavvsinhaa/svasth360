import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigator} from './src/navigation/Navigator';
import { AuthProvider } from './src/context/Auth';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
