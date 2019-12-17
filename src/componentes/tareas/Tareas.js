import React, { Component, Fragment } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SectionList, Image} from 'react-native'
import eliminarImg from 'hola/assets/delete.png'
import CheckBox from 'react-native-check-box'

const styles = StyleSheet.create({
  contentContainer:{
    flexGrow: 1
  },
  lista:{
    //borderWidth:1,
    margin: 5,
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: "center"
  },
  texto:{
    flex: 1,
    padding: 5,
    fontWeight:'bold'
  },
  texto_hecho:{
    color:'#aaa',
    textDecorationLine: 'line-through',
    fontWeight: 'normal'
  },
  contenedor: {
    width: '100%'
  },
  guiones:{
    padding: 5,
    fontWeight:'bold'
  },
  eliminar:{
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  eliminarTexto: {
    color: '#ff0000',
    fontSize: 18
  },
  separador:{
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%'
  },
  listaVacia:{
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  sectionHeader:{
    backgroundColor:'#ddd',
    padding:10
  },
  icono:{
    width: 20,
    height: 20
  },
  imgCheck:{
    width: 50,
    height: 50
  }
})

//const Tareas = ({tareas, actualizar, eliminar}) => {
export default class Tareas extends Component {
  render() {
    const {tareas, actualizar, eliminar, editar} = this.props

    renderItem = tarea => (
      <TouchableOpacity style={styles.lista} key={tarea.texto} onPress={() => editar(tarea)}>
          <CheckBox
            checkedCheckBoxColor='#aaa'
            onClick={() => {
              actualizar({...tarea, estado: !tarea.estado})
            }}
            isChecked={tarea.estado}
          />
          <Text style={[styles.texto, tarea.estado && styles.texto_hecho]}>{tarea.texto}</Text>
          <TouchableOpacity style={styles.eliminar} onPress={() => eliminar(tarea)}>
            <Image source={eliminarImg} style={styles.icono}/>
          </TouchableOpacity>
      </TouchableOpacity>
    )

    renderSeparator = () => {
      return <View style={styles.separador} />
    }

    renderEmptyComponent = () => (
      <View style={styles.listaVacia}>
        <Image style={styles.imgCheck} source={require('hola/assets/check.png')} />
        <Text>Lista Vacia</Text>
      </View>
    )

    renderSectionHeader = ({section: {title, data}}) => (
      <View style={styles.sectionHeader}>
        <Text>{title} ({data.length})</Text>
      </View>
    )

    return (
      <SectionList 
      style={styles.contenedor}
      sections={
        tareas && tareas.length ? [
          {title:'Tareas sin Hacer', data:tareas.filter(tarea => !tarea.estado).sort((a,b) => a.prioridad > b.prioridad ? 1 : b.prioridad > a.prioridad ? -1 : 0)},
          {title:'Tareas Terminadas', data:tareas.filter(tarea => tarea.estado).sort((a,b) => a.prioridad > b.prioridad ? 1 : b.prioridad > a.prioridad ? -1 : 0)}
        ] : []
        
      }
      keyExtractor={tarea => tarea.id}
      renderItem={({item}) => renderItem(item)}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmptyComponent}
      stickySectionHeadersEnabled={true}
    /> )
  }}
