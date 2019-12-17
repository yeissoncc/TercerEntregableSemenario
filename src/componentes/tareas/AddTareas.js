import React, { Component } from 'react';
import {View, Text, Modal, TextInput, StyleSheet, Button, Picker} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"flex-end",
        flexDirection: "row",
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    content:{
        padding: 20,
        paddingBottom: 30,
        flex:1,
        backgroundColor: '#ffffff',
        shadowOffset:{width: 0, height:-3},
        shadowColor:'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 30
    },
    texto:{
        borderBottomWidth: 1,
        padding: 5
    }, 
    block:{
        margin: 10
    }, 
    botones:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20
    }
})

const estadoInicial = {
    texto: "",
    descripcion: "",
    prioridad: 2
}

const prioridades = [
    'Urgente', 'Importante', 'Normal', 'No Importante'
]

export default class AddTareas extends Component {
    constructor(props){
        super(props)
        this.state={
            ...estadoInicial
        }
    }

    anadir = () => {
        const {anadirTarea, cerrarModal} = this.props
        const {texto, descripcion, prioridad} = this.state
        anadirTarea({texto, descripcion, prioridad})
        this.setState(estadoInicial)
        cerrarModal()
    }

  render() {
      const {texto, descripcion, prioridad} = this.state
      const {cerrarModal, visibilidad} = this.props
    return (
      <Modal visible={visibilidad} transparent={true} animationType="slide">
          <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.block}>
                    <Text>Titulo</Text>
                    <TextInput
                    style={styles.texto}
                    placeholder='Ingrese Tarea' 
                    value={texto}
                    onChangeText={texto => this.setState({texto:texto})}
                    />
                </View>
                <View style={styles.block}>
                    <Text>Descripcion</Text>
                    <TextInput  
                    style={styles.texto}
                    placeholder='Ingrese Descripción' 
                    value={descripcion}
                    onChangeText={descripcion => this.setState({descripcion:descripcion})}
                    />
                </View>
                <View style={styles.block}>
                    <Text>Prioridad</Text>
                    <Picker
                        selectedValue={prioridad}
                        onValueChange={prioridad => this.setState({prioridad})}
                    >
                        {
                            prioridades.map((item, idx) => 
                                <Picker.Item label={item} value={idx}/>
                            )
                        }
                    </Picker>
                </View>
                <View style={styles.botones}>
                    <Button title="Cerrar" onPress={cerrarModal} color='#ff0000' />
                    <Button title="Añadir" onPress={this.anadir} />
                </View>
            </View>
          </View>
      </Modal>
    );
  }
}
