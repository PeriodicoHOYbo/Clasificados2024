import { useUser } from '../context/Context.js'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Banner.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'


export default function Banner({ carpeta, items, click }) {

    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    // console.log(userDB[ruta])
    const router = useRouter()

    const buttonStyle = {
        width: "30px",
        background: 'none',
        border: '0px'
    };

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}></button>,
        nextArrow: <button style={{ ...buttonStyle }}></button>
    }
    function redirect(rute) {
        window.open(rute, '_blank')
    }
    // console.log(userDB[`${carpeta}-derecho1`])
    return (
        <>
            {
                items.map((item,) =>
                    userDB[`${carpeta}${item}`] && postsIMG && <div className={`${styles.containerFadeRight}`} >

                        {
                            Object.keys(userDB[`${carpeta}${item}`]).length == 1 ?
                                Object.keys(userDB[`${carpeta}${item}`]).map((i, index) =>
                                    <div className="each-slide" key={index} >
                                        <div className={styles.containerIframe}>
                                            {
                                                router.pathname === "/Admin" ?
                                                    <span onClick={() => click({ carpeta, item, i })}>

                                                        {userDB[`${carpeta}${item}`][i].url
                                                            ?
                                                            <>
                                                                <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].url} />

                                                                {userDB[`${carpeta}${item}`][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${carpeta}${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                                                    <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                                                </Link>}


                                                            </>
                                                            :
                                                            <iframe
                                                                className={styles.responsiveIframe}
                                                                src={userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${carpeta}${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0': userDB[`${carpeta}${item}`][i].enlace}
                                                                title="YouTube video player"
                                                                frameborder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowfullscreen></iframe>
                                                        }

                                                    </span>
                                                    : <span onClick={() => redirect(userDB[`${carpeta}${item}`][i].enlace ? userDB[`${carpeta}${item}`][i].enlace : '#')}>

                                                        {userDB[`${carpeta}${item}`][i].url
                                                            ?
                                                            <>
                                                                <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].url} />
                                                                {userDB[`${carpeta}${item}`][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${carpeta}${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                                                    <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                                                </Link>}
                                                            </> :
                                                            <iframe
                                                                className={styles.responsiveIframe}
                                                                src={userDB[`${carpeta}${item}`][i].enlace.includes('https://www.youtube') ? userDB[`${carpeta}${item}`][i].enlace.replace('/watch?v=', '/embed/') + '?showinfo=0': userDB[`${carpeta}${item}`][i].enlace}
                                                                title="YouTube video player"
                                                                frameborder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowfullscreen></iframe>
                                                        }

                                                    </span>
                                            }
                                        </div>
                                    </div>
                                )
                                :
                                <Fade transitionDuration={8000} duration={10} scale={1}{...properties} indicators={true} easing='cubic'>
                                    {
                                        Object.keys(userDB[`${carpeta}${item}`]).map((i, index) =>
                                            <div className="each-slide" key={index} >
                                                <div>
                                                    {
                                                        router.pathname === "/Admin" ?
                                                            <span onClick={() => click({ carpeta, item, i })}>


                                                                <>
                                                                    <img className={styles.sliderIMG} src={userDB[`${carpeta}${item}`][i].url} />
                                                                    {userDB[`${carpeta}${item}`][i].whatsapp !== '' && <Link href={`https://api.whatsapp.com/send?phone=${userDB[`${carpeta}${item}`][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                                                        <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                                                                    </Link>}
                                                                </>

                                                            </span>
                                                            : <span onClick={() => redirect(userDB[`${carpeta}${item}`][i].enlace ? userDB[`${carpeta}${item}`][i].enlace : '#')}><img className={styles.sliderIMG} src={postsIMG[`Banners/${i}`]} /></span>
                                                    }
                                                </div>
                                            </div>
                                        )}
                                </Fade>
                        }
                    </div>
                )
            }
        </>
    )
}




