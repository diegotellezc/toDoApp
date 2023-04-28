import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, changeShowModal, setTaskToEdit, updateTask } from '../store/slices/todo.slice'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid';

const DEFAULT_VALUES = {
    title: "",
    description: ""
}

const Modal = () => {

    const dispatch = useDispatch()

    const handleClickClosewModal = () => {
        dispatch(changeShowModal())
    }
    
    const {handleSubmit, register, reset } = useForm()

    const submit = (data) => {
        if(taskToEdit) {
            const newTask = {
                ...taskToEdit,
                ...data
            }
            dispatch(updateTask(newTask))
            dispatch(setTaskToEdit(null))
        } else {
            const newTask = {
                ...data,
                id: uuid(),
                done: false
            }
            dispatch(addTask(newTask)) 
        }

        
        dispatch(changeShowModal())
        reset(DEFAULT_VALUES)
    }
    

    const {isShowModal, taskToEdit} = useSelector((store) => store.todo)

    useEffect(() => {
        if(taskToEdit){
            reset(taskToEdit)
        } 
    }, [taskToEdit])

    return (
        <section className={`fixed top-0 left-0 right-0 bottom-0 grid place-content-center bg-black/70 duration-200 ${isShowModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <form onSubmit={handleSubmit(submit)} className='grid gap-4 w-[300px] relative py-6'>
                <h2 className='text-3xl text-center'>{taskToEdit ? "Editar tarea" : "Nueva tarea"}</h2>
                <div className='grid gap-1'>
                    <label htmlFor="">Título</label>
                    <input {...register("title")} className='text-black rounded-md p-2 outline-none' type="text" />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="">Descripción</label>
                    <textarea {...register("description")} className='text-black rounded-md p-2 outline-none' rows="6"></textarea>
                </div>

                <i onClick={handleClickClosewModal}  className='bx bx-x text-3xl absolute right-0 top-0 hover:text-indigo-500 transition-colors cursor-pointer'></i>

                <button className='bg-indigo-500 py-2 px-6 max-w-max mx-auto rounded-md hover:bg-indigo-400 hover:tracking-wider duration-200'>{taskToEdit ? "Actualizar" : "Crear tarea"}</button>
            </form>
        </section>
    )
}

export default Modal
