if (__DEV__) {
    import('../ReactotronConfig').then(() =>
        console.log('Reactotron Configured'),
    );
}

import React from 'react';
import {ScrollView} from 'react-native';
import MegaSena from './components/megasena/MegaSena';

const App: () => React$Node = () => {
    return (
        <>
            <ScrollView>
                <MegaSena />
            </ScrollView>
        </>
    );
};

export default App;
