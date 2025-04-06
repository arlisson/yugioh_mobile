import React from 'react';

import {StatusBar} from 'react-native';


export default function BarraStatus({backgroundColor='#4A90E2'}) {


return (
    <>
     <StatusBar StatusBar barStyle="light-content" backgroundColor={backgroundColor}/>
    </>
);
}