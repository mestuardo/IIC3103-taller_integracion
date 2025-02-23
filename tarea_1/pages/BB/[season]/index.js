import React from 'react';
import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


import Head from 'next/head'

import CircularProgress from '@material-ui/core/CircularProgress';




function caratulas(temporada){
  if (temporada==1){
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-1.jpg"
  }
  else if (temporada==2) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-2.jpg"
  }
  else if (temporada==3) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-3.jpg"
  }
  else if (temporada==4) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-4.jpg"
  }
  else if (temporada==5) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-5.jpg"
  }
  else{
    return 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rick-and-morty-season-4-trailer-1-1570450125.jpg?crop=0.564xw:1.00xh;0,0&resize=768:*'
  }
}






const useStyles = makeStyles({
  root: {
    maxWidth: '230px',
    margin: '10px',
    textAlign:'center',
    height:'380px',
    opacity: '0.8',
    transition: '0.3s',
    "&:hover":{
      opacity: '1',
    },
  },
  media: {
    maxWidth: '230px',
    textAlign:'center',
    height:'380px',
    opacity: '0.8',
    transition: '0.3s',
    "&:hover":{
      opacity: '1',
    },
},

});




// posts will be populated at build time by getStaticProps()
export default function Temporadas( {temporada} ) {

  const classes = useStyles();

  const router = useRouter()

  if (router.isFallback) {
    return ( 
      <div className={styles.container}>
      <Head>
        <title>Cargando...</title>
   
      </Head>
  
      <main className={styles.main}>

    <CircularProgress color="primary" />

  </main>
  </div> )
  }





  
  return (

    <div className={styles.container}>
    <Head>
      <title>Temporada {temporada[0].season} - {temporada[0].series}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>

      <Link href={`/BB`}>
      <p className={styles.description}>
   <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
           
      </p>
      </Link>
      <h3>Temporada {temporada[0].season}</h3>
  
  
      <div className={styles.listaItems}>
    

    {temporada.map((temp) => (

        
              
   <li key={temp.episode_id} >
      <Link href={`${encodeURIComponent(temp.season)}/${encodeURIComponent(temp.episode)}`}>
   <Card className={classes.root} >
      <CardActionArea className={classes.media}>
        <div className={styles.imgCard} style={{backgroundImage:"url("+caratulas(temp.season) +")",backgroundSize:'cover'}}>
          {temp.episode}
        
        </div>
        <CardContent>
          <Typography style={{height:'60px'}} gutterBottom variant="h6" component="h2">
          {temp.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Click para ver más detalles
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>

    </li>

    

          ))}



    </div>

   
      </main>
      </div>
  )
}





export async function getStaticProps({ params }) {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
  const data = await res.json()
  let temp = data.filter(x => x.season.toString() == params.season);    


  if (temp.length==0){
    return {
      notFound: true
    }
  }

  return {
    props: {
        temporada: temp
    },
    revalidate: 3600
  };
}



export async function getStaticPaths() {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
  const data = await res.json()

  // var temp_1 = data.filter( element => element.season =="1")
  // const data_json =JSON.parse(JSON.stringify(data))

  // Get the paths we want to pre-render based on posts
  const paths = data.map(episode => ({
      params: {
        season: episode.season.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return {paths, fallback: true}
}
