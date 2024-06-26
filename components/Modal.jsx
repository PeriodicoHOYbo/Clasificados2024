import style from '../styles/Modal.module.css'
import { writeUserData, getData, removeData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import { getDate, getDayMonthYear, getMonthAndYear, formatDayMonthYear } from '../utils/Utils'
import FormAddsC from './FormAddsC'


export default function Error({ key, rute, carpeta, item, i, post, topic, close }) {
    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear } = useUser()

    const [data, setData] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)
    const [isCheckedLength, setIsCheckedLength] = useState(true)

    const [isCheckedComp, setIsCheckedComp] = useState(true)

    function manageInputIMGSetting(e) {

        ("funcionando")
        const fileName = `${e.target.name}`
        const file = e.target.files[0]

        if (fileName === 'PostImage') {
            setPostImage(file)
            setUrlPostImage(URL.createObjectURL(file))
        }
    }

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }
    console.log(data)
    function handlerCheckedLength() {
        setIsCheckedLength(!isCheckedLength)
    }
    function handlerCheckedComp() {
        setIsCheckedComp(!isCheckedComp)
    }
    function saveConfig(e, key) {
        e.preventDefault()

        const monthYear = monthAndYear ? monthAndYear : getMonthAndYear()
        const newDate = new Date().getTime()
        if (key == "SavePost") {
            const ruteSTG = `${topic}` // Nov-2022/
            const fileName = `PostImage_${i}` // PostImage_Tue Nov 15 2022 
            const ruteDB = `/${topic}/Posts/${fileName}` // Nov-2022/Inicio

            // const object = { [fileName]: { ...userDB[topic].Posts[`PostImage_${i}`], fecha: newDate, description: data.descriptionPost ? data.descriptionPost : userDB[topic].Posts[`PostImage_${i}`].description, enlace: data.enlacePost ? data.enlacePost : userDB[topic].Posts[`PostImage_${i}`].enlace, objectFit: data.objectPositionPost ? data.objectPositionPost : userDB[topic].Posts[`PostImage_${i}`].objectFit, ...data } }
            const object = { ...data }
            writeUserData(ruteDB, object, setUserSuccess, setUserData)
            postImage && uploadIMG(ruteDB, ruteSTG, fileName, postImage, setUserSuccess, monthYear, isCheckedComp)
        }
    }

    function remove(e, key) {
        e.preventDefault()
        if (key == 'DeletePost') {
            const ruteDB = `${topic}/Posts/PostImage_${i}`
            removeData(ruteDB, setUserData, setUserSuccess)
            close(null)
        }
    }
    function handlerEventChange3(e) {
        let year = e.target.value.split('-')[0]
        let month = e.target.value.split('-')[1]
        let day = e.target.value.split('-')[2]
    
        const name = e.target.name
        const value = e.target.value
        const object = { [name]:  new Date(parseInt(year), parseInt(month - 1), day, 0, 0, 0).getTime() }
    
        setData({ ...data, ...object })
    }
    return (
        <div className={style.containerEditor}>
            <div className={style.containerForm}>
                <span className={style.close} onClick={() => close(null)}>X</span>

                {carpeta == 'Post' &&
                    <form className={style.formSelectPost}>
                        <label className='bg-[brown] text-white w-full rounded-full p-1 text-[12px] mb-5' >Editar</label>
                        <input type="text" placeholder='Descripción' name="description" defaultValue={userDB[topic]["Posts"][`PostImage_${i}`].description} onChange={handlerEventChange} maxLength={isCheckedLength ? 65 : ''} />
                        <input type="text" placeholder='Enlace' name="enlacePost" defaultValue={userDB[topic]["Posts"][`PostImage_${i}`].enlace} onChange={handlerEventChange} />
                        <input type="text" className='w-full border-b-[1px] border-gray-500' placeholder='WhatsApp'  defaultValue={userDB[topic]["Posts"][`PostImage_${i}`].whatsapp} name="whatsapp" onChange={handlerEventChange} />
                        <input type="text" className='w-full border-b-[1px] border-gray-500' placeholder='URL de redireccion' defaultValue={userDB[topic]["Posts"][`PostImage_${i}`].redireccion}  name="redireccion" onChange={handlerEventChange} />
                        <input className='w-full border-b-[1px] border-gray-500' type="date" id="start"  defaultValue={formatDayMonthYear(userDB[topic]["Posts"][`PostImage_${i}`].dateInit)} name={`dateInit`} onChange={handlerEventChange3} />
                        <input className='w-full border-b-[1px] border-gray-500' type="date" id="start"  defaultValue={formatDayMonthYear(userDB[topic]["Posts"][`PostImage_${i}`].dateFinish)} name={`dateFinish`} onChange={handlerEventChange3} />
                        <div className={`${style.radioInputs} max-w-[200px]`}>
                            <input type="checkbox" onClick={handlerCheckedLength} checked={isCheckedLength} /> Max65
                        </div>
                        <Button style="buttonMiniSecondary" click={(e) => saveConfig(e, "SavePost")}>Guardar</Button>
                        <br />
                        <Button style="buttonMiniSecondary" click={(e) => remove(e, "DeletePost")}>Eliminar</Button>
                    </form>}

                {userDB && postsIMG && carpeta === "BannerTop" && <FormAddsC ruteDB={`${topic}/${carpeta}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Cabecera`} i={i} carpeta={carpeta} dataDB={userDB[topic][`${carpeta}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerBottom" && <FormAddsC ruteDB={`${topic}/${carpeta}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Pie`} i={i} carpeta={carpeta} dataDB={userDB[topic][`${carpeta}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerPortada" && <FormAddsC ruteDB={`${carpeta}${item}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Portada ${item}`} i={i} carpeta={carpeta} dataDB={userDB[`${carpeta}${item}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerIzquierdo" && <FormAddsC ruteDB={`${carpeta}${item}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Izquierdo ${item}`} i={i} carpeta={carpeta} dataDB={userDB[`${carpeta}${item}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerDerecho" && <FormAddsC ruteDB={`${carpeta}${item}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Derecho ${item}`} i={i} carpeta={carpeta} dataDB={userDB[`${carpeta}${item}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerNotas" && <FormAddsC ruteDB={`${carpeta}${item}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner de Notas 1 ${item}`} i={i} carpeta={carpeta} dataDB={userDB[`${carpeta}${item}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}


            </div>
        </div>
    )
}



