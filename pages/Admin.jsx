import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import Error from '../components/Error'
import Layout from '../layout/Layout'

import BannerLeft from '../components/BannerLeft'
import BannerRight from '../components/BannerRight'
import Modal from '../components/Modal'

import Section from '../components/Section'
import Header from '../components/Header'
import { sectionsDB } from '../utils/SectionsDB.js'
import styles from '../styles/Home.module.css'
import { handleSignOut, writeUserData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EdicionDigital from '../components/EdicionDigital.jsx'
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_API_KEY = "AIzaSyBZkk7x_tGRbf-Yg_A7Y9QYcBQe7T9QtWU"

var fetch_url = `${YOUTUBE_PLAYLIST_ITEMS_API}`
function Admin() {
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date,  showImg, showVideo, setUserDate, viewPeriodista, setUserViewPeriodista } = useUser()
  const router = useRouter()


  //console.log(postsIMG)

  function handlerUploadFile(e, fileName) {
    const file = e.target.files[0]
    uploadIMG(file, fileName, setUserSuccess, postsIMG, setUserPostsIMG)
  }

  const [elements, setElements] = useState(false)
  const [dataForDate, setDataForDate] = useState([])
  const [dataEditor, setDataEditor] = useState(null)

  const [listYT, setListYT] = useState(false);


  // const [zoomIMG, setZoomIMG] = useState(undefined)
  const [modalsInterval, setModalsInterval] = useState(false)

  async function getYB() {
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=8&playlistId=UULFXFA6pzESb1NQMsepmhC6Vw&key=${YOUTUBE_API_KEY}`)
    const data = await res.json();
    setListYT(data)
  }

  function redirectYT() {
    window.open('https://www.youtube.com/@periodicohoybolivia2201/videos', '_blank')
  }

  useEffect(() => {
    getYB()
  }, [])
  function setPostsElements() {
    setElements(!elements)
  }


  function handlerLogout(e) {
    handleSignOut()
    router.push("/Login")

  }

  function dateEvent(e) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    console.log(e.target.value)
    const format = e.target.value.split("-")
    console.log(format)
    setUserDate(`${parseInt(format[2])}-${months[format[1] - 1]}-${format[0]}`)

  }
  function handlerViewPeriodista() {
    setUserViewPeriodista(!viewPeriodista)
  }
  // console.log(user.uid)
  function handlerClickEnlace(i) {
    router.pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
    router.pathname == "/Admin" && setDataEditor(i)
  }
  function resetAutomatico() {
    writeUserData(`/`, { login: !userDB.login }, setUserSuccess)
  }

  // userDB['Inmobiliria'] && Object.keys(userDB['Inmobiliria'].Posts).map((i)=>{
  //   let rute = `Inmobiliria/Posts/${i}`
  // userDB['Inmobiliria'].Posts[i].fecha && writeUserData(rute,{fecha: new Date(userDB['Inmobiliria'].Posts[i].fecha).getTime()})
  //   })

  console.log(userDB)

  useEffect(() => {

    if (userDB.users && userDB.users[user.uid] == undefined) {
      router.replace('/Register')
      return
    }
  }, [userDB]);

  return (
    <Layout>
      <main className={`${styles.main} `}>

        <div className={styles.containerLogout}>
          <span> <img src={userDB.users && userDB.users[user.uid] && userDB.users[user.uid].url} className={styles.perfilIMG} alt="" />Bienvenido {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].name} </span>
          {
            user && userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' ? <div className={styles.blueContainer}>
              <span className={styles.blue}>Register</span>

              <span className={`${styles.circleBlueContainer} ${userDB.login ? '' : styles.circleLeadContainer}`} onClick={resetAutomatico}>
                <span className={`${styles.circleBlue} ${userDB.login ? '' : styles.circleLead}`}></span>
              </span>
            </div>: <span></span>
          }
          <Button style="buttonPrimary" click={handlerLogout}>Logout</Button>
          <span className='block w-full h-[3px] absolute bottom-[-7px] left-0 bg-[brown]'></span>
        </div>
        <Header></Header>





        { showVideo === 'EdicionDigital' && <EdicionDigital></EdicionDigital>}
          {showImg &&

            <div className={styles.gridImages}>

              {userDB && userDB.Inicio && Object.keys(userDB.Inicio.Posts).map((i, index) => {

                return <div className={styles.image} key={index}>
                  <Link href='#' legacyBehavior>
                    <a target='_blank'>
                      <img className={styles.image} src={userDB.Inicio.Posts[i].url} alt="img" />
                      <span className={styles.description}>{userDB.Inicio.Posts[i].description}</span>
                    </a>
                  </Link >
                </div>
              })}
            </div>}

          {showVideo  === 'YouTube' && listYT !== false &&

            <div className={styles.gridVideos}>
              {listYT.items.map(({ id, snippet = {} }) => {
                const { title, thumbnails = {}, resourceId = {} } = snippet;
                const { medium } = thumbnails;
                return (
                  <div key={id} className={styles.boxVideo}>
                    <iframe
                      className={styles.video}
                      // width={medium.width}
                      // height={medium.heigth}
                      src={`https://www.youtube.com/embed/${resourceId.videoId}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen></iframe>

                    {/* <p className={styles.videoDescription}>{title}</p> */}
                  </div>
                )
              })}

              <div className={styles.boxVideo} onClick={redirectYT}>
                <img className={styles.seeMoreYT}
                  src="/seeMoreYT.jpeg"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen />
                {/* <p className={styles.videoDescription}>Las noticias mas relevantes en <br /> HOY.BO</p> */}
              </div>
            </div>}










        
       { showImg == false && showVideo == false && sectionsDB.map((i, index) => <Section topic={i.hash}  title={i.title}  publicView={false} color='#8FC2C9' key={index}></Section>)}

        {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' && <button className={styles.viewPeriodista} onClick={handlerViewPeriodista}>P</button>}
      </main>


      {dataEditor && <Modal post={dataEditor.key} topic={'/'} i={dataEditor.i} close={handlerClickEnlace}></Modal>}
      {success === "CompleteFORM" && <Error>Complete el formulario...</Error>}
      {success === "CompleteFechaInit" && <Error>Complete la fecha de inicio...</Error>}
      {success === "CompleteFechaFinish" && <Error>Complete la fecha final...</Error>}
      {success === "CompleteIMG" && <Error>Añade una imagen...</Error>}
      {success == "Cargando" && <Success>Cargando...</Success>}
      {success == "save" && <Success>Cargando...</Success>}

    </Layout>
  )
}

export default WithAuth(Admin) 









