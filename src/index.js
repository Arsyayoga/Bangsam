import {
    StackNavigator
} from 'react-navigation';

import Screen from './screen'
import Signup from './screen/signup'
import Reset from './screen/ResetPassword'

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
}, {
    headerMode : "screen",
    initialRouteName : "Screen"
})