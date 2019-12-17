import uuid from 'uuid'
//npm install uuid
import AsyncStorage from '@react-native-community/async-storage'

const delay = ms => new Promise(res => setTimeout(res, ms))

const TAREAS_KEY = "@MyStore:tareas"

const obtenerTareas = async () => {
    let tareas = []
    try{
        tareas = await AsyncStorage.getItem(TAREAS_KEY)
    }catch (error){
        console.log(error.message)
    }
    return JSON.parse(tareas)
}

const newTarea = tarea => ({
    id: uuid(),
    texto: tarea.texto,
    createdAt: new Date(),
    estado: tarea.estado,
    prioridad: tarea.prioridad
})

const updateTarea = (list, tarea) => {
    const updateIndex = list.findIndex(t => t.id === tarea.id)
    const newTareaList = [...list]
    newTareaList[updateIndex] = tarea
    saveTareas(newTareaList)
    return newTareaList
}

//const addTarea = (list, tarea) => [...(list || []), newTarea(tarea)]
const addTarea = (list, tarea) => {
    const newTareaList = [...(list || []), newTarea(tarea)]
    saveTareas(newTareaList)
    return newTareaList
}

const saveTareas = async tareas => {
    try{
        const resp = await AsyncStorage.setItem(TAREAS_KEY, JSON.stringify(tareas))
    }catch (error){
        console.log(error.message)
    }
}

const deleteTarea = (list, tarea) => {
    const newTareaList = list.filter(t => t.id != tarea.id)
    saveTareas(newTareaList)
    return newTareaList
} 

export {obtenerTareas, addTarea, updateTarea, deleteTarea}