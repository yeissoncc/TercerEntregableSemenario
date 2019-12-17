import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, Button, View, ActivityIndicator, Alert} from "react-native";
import Tareas from 'hola/src/componentes/tareas/Tareas'
import {obtenerTareas, addTarea, updateTarea, deleteTarea} from 'hola/src/data/tareas/Tareas'
import AddTareas from 'hola/src/componentes/tareas/AddTareas'
import FAB from 'hola/src/componentes/tareas/FAB'

const styles = StyleSheet.create({
    contenedor:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        //marginTop: 30
        //justifyContent: 'center'
    },
    titulo:{
       fontWeight: 'bold',
       fontSize: 20 
    },
    texto:{
      flex: 1,
      borderBottomWidth: 1,
      padding: 5
    },
    botonAnadir:{
      flexDirection: "row",
      width: '80%'
    },
    cargando:{
      flex:1
    }

})
export default class PantallaPrincipal extends Component {
  
  static navigationOptions = {
    title: "Tareas APP"
  }
  
  state={
        tareas:[],
        nueva_tarea: null,
        cargando: true,
        visibilidaModal: false
    }
    componentDidMount = async() => {
      const tareas = await obtenerTareas()
        this.setState({tareas: tareas, cargando:false})
    }

    handleAnadir = tarea => {
      const {tareas} = this.state
      const newLista = addTarea(tareas, tarea)
      this.setState({tareas: newLista, nueva_tarea: null})
    }
    handleActualizar = tarea => {
      const {tareas} = this.state
      const newLista = updateTarea(tareas, tarea)
      this.setState({tareas:newLista})
    }

    handleEliminar = tarea => {
      
      Alert.alert("Quieres eliminar la tarea", tarea.texto, [
        {
          text: 'Cancelar',
          style: "cancel"
        },
        {
          text: 'Aceptar',
          onPress: () => {
            const {tareas} = this.state
            const newLista = deleteTarea(tareas, tarea)
            this.setState({tareas:newLista})
          }
        }
      ])

      
    }

    toogleModal = () => {
      this.setState({visibilidaModal: !this.state.visibilidaModal})
    }

    handleEditar = tarea => {
      this.props.navigation.navigate("Editar", {
        tarea,
        onSave: this.handleActualizar
      })
    }

  render() {
    const {tareas, nueva_tarea, cargando, visibilidaModal} = this.state
    return (
      <SafeAreaView style={styles.contenedor}>
          {
            cargando &&
            <ActivityIndicator style={styles.cargando} size="large" color="#0066ff" />
          }
          {
            !cargando &&
            <Tareas tareas={tareas} actualizar={this.handleActualizar}eliminar={this.handleEliminar} editar={this.handleEditar} />
          }

          <FAB
            texto="+"
            fabStyle={{backgroundColor:'#0066ff'}}
            textStyle={{color:'#fff'}}
            onPress={this.toogleModal}
          />
          
          <AddTareas 
          cerrarModal={this.toogleModal}
          visibilidad={visibilidaModal}
          anadirTarea={this.handleAnadir}
          />
      </SafeAreaView>
    );
  }
}
