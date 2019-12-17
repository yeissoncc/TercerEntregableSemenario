import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PantallaPrincipal from 'hola_mundo/src/pantallas/principal/PantallaPrincipal'
import EditarTarea from 'hola_mundo/src/pantallas/editarTarea/editarTarea'

export default createAppContainer(
    createStackNavigator({
        Main: {screen: PantallaPrincipal},
        Editar:{screen: EditarTarea}
    },
    {
        initialRouteName: "Main",
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor: '#0066ff'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
                fontWeight:'bold'
            }
        }
    }
    )
)