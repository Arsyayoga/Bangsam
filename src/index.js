import {
    StackNavigator
} from 'react-navigation';

import Screen from './screen'
import Signup from './screen/signup'
import Reset from './screen/ResetPassword'
import Splash from './screen/splash'
import AmbilSampah from './screen/bangsam/ambilsampah'

export default StackNavigator({
    Screen : {
        screen : Screen
    },
    Signup : {
        screen : Signup
    },
    Reset : {
        screen : Reset
    },
    Splash : {
        screen : Splash
    },
    AmbilSampah : {
        screen : AmbilSampah
    }
}, {
    headerMode : "screen",
    initialRouteName : "Splash"
})