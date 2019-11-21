<template>
  <div>
    <div class="overlay" v-if="spinner">
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="65"
          color="#EA771D"
        />
      </div>
    <div v-else>
        <section class="hero">
        <div
        class="background-image"
        v-bind:style="{ 'background-image': 'url(' + image + ')' }">
        </div>
           <div class="layer">
    </div>
        <div class="hero-content-area">
            <h1>{{ titulo }}</h1>
            <h2> {{ subtitulo }}</h2>
            <h3> {{ fecha }}</h3>
            <h4> {{ direccion }}</h4>
        </div>
    </section>
    <section class="destinations">
        <h3 class="title">International Experts</h3>
        <hr>
        <ul class="grid">
            <li
            v-for="(value, index) in oradoresPlenaria"
            v-bind:key="index">
                <div class ="containerImg">
                    <img :src="value.foto">
                </div>
                <div>
                    <h4>{{ value.name }}</h4>
                </div>
                <div>
                    <a target="_blank"
                       rel="noopener noreferrer"
                       :href="value.link">
                          {{ value.name}} WebPage
                    </a>
                </div>
            </li>
        </ul>
</section>
    <section class="testimonials2">
        <h3 class="title">{{ titulo }}</h3>
        <p>{{ subtitulo }}</p>
        <hr>
        <p class="quote">{{textAboutEvic}}</p>
        <p class="author">- {{ titulo}}</p>
    </section>

    <section class="contact">

    <div class ="map-container">
        <iframe ref="map" class="__map_iframe"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            :src="getMapIframeSrc">
        </iframe>
        <br/>
            <small>
                    <a ref="mapLink" :href="getMapLinkHref" target="_blank">View Larger Map</a>
                </small>
            </div>

    </section>
  <section>
       <h3 class="title">Sponsors</h3>
        <hr>
    <ul class="flex-container wrap">
    <li
    class="flex-item"
    v-for="(value, index) in auspiciadores"
    v-bind:key="index">
         <img :src="value.link">
    </li>
    </ul>
  </section>
        <section class="packages">
        <h3 class="title">Exhibitor</h3>
        <hr>
        <ul class="grid">
            <li
            v-for="(value, index) in organizadores"
            v-bind:key="index">
                <h2>{{ value.cargo }}</h2>
                <h4>{{ value.name }}</h4>
                <p>{{ value.corta }}</p>
            </li>
        </ul>
    </section>
        <section class="testimonials2">
            <div>
                <h3 class="title">{{ titulo }} previous</h3>
                <div class ="link-container">
                    <a href="http://evic.cl/2017/">2017</a>
                    <a href="http://evic.cl/2016/">2016</a>
                    <a href="http://evic.cl/2015/">2015</a>
                    <a href="http://evic.cl/2012/">2012</a>
                    <a href="http://evic.cl/2010/">2010</a>
                    <a href="http://evic.cl/2009/">2009</a>
                    <a href="http://evic.cl/2008/">2008</a>
                    <a href="http://evic.cl/2007/">2007</a>
                    <a href="http://evic.cl/2006/">2006</a>
                    <a href="http://evic.cl/2005/">2005</a>
                    <a href="http://evic.cl/2004/">2004</a>
                </div>
            </div>
    </section>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
import { BreedingRhombusSpinner } from 'epic-spinners';

export default {
  components: {
    BreedingRhombusSpinner,
  },
  data() {
    return {
      image: '',
      urlGary: '@/gary.jpeg',
      spinner: true,
      titulo: '',
      subtitulo: '',
      oradoresPlenaria: {},
      expositores: {},
      resena: '',
      direccion: '',
      fecha: '',
      auspiciadores: {},
      organizadores: {},
      imageUrl: [],
      structName: [],
      txtMark: 'LUGAR DEL EVENTO',
      indexForPath: 0,
      pathImageOradores: [],
      textAboutEvic: '',
    };
  },
  computed: {
    getMapIframeSrc() {
      return 'https://www.openstreetmap.org/export/embed.html?bbox=-70.68730115890504%2C-33.44758783758052%2C-70.68057954311372%2C-33.44356827963777&amp;layer=mapnik&marker=-33.446116%2C-70.682535';
    },
    getMapLinkHref() {
      return this.getMapLink(-33.446116, -70.682535);
    },
  },
  methods: {
    setData() {
      const starCountRef = firebase.database().ref('/');
      starCountRef.once('value', (snapshot) => {
        this.titulo = snapshot.val().titulo;
        this.subtitulo = 'XIV IEEE international Summer School on Computational Intelligence';
        this.textAboutEvic = snapshot.val().descripcion;
        this.direccion = snapshot.val().ubicacion.direccion;
        this.oradoresPlenaria = snapshot.val().plenaria;
        this.image = snapshot.val().fondo;
        this.fecha = '12 - 13 - 14 / December';
        this.organizadores = snapshot.val().organizadores;
        this.auspiciadores = snapshot.val().auspiciadores;
        this.expositores = snapshot.val().expositores;
        this.spinner = false;
      });
    },
    getMapLink(latitude, longitude) {
      return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
    },
  },
  mounted() {
    this.setData();
  },
};
</script>

<style scoped>
.overlay {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20% 0 100% 0;
  }
nav {
    list-style: none;
}

a {
    text-decoration: none;
    opacity: 0.75;
    color: white;
}

a:hover {
    opacity: 1;
}

a.btn {
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    background-color: #3f51b5;
    opacity: 1;
}
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 80px;

}
.__map_iframe {
        width: 100%;
        height: 400px;
        border: none;
        box-shadow: $klp-box-shadow;
    }
.map-container{
    width: 100%;
}
.link-container{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex-wrap: wrap-reverse;
}
section:not(.hero):nth-child(odd) {
    background-color: #f5f5f5;
}


ul {
    list-style: none;
}

.grid {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

hr {
    width: 250px;
    height: 3px;
    background-color: #EA771D;
    border: 0;
    margin-bottom: 50px;

}

section h3.title {
    text-transform: capitalize;
    font: bold 32px "Open Sans", sans-serif;
    margin-bottom: 30px;
    text-align: center;
}

section p {
    max-width: 775px;
    line-height: 2;
    padding: 0 20px;
    margin-bottom: 30px;
    text-align: center;
}
section a {
    max-width: 775px;
    line-height: 2;
    padding: 0 20px;
    margin-bottom: 30px;
    text-align: center;
    color: black;
}

.link-container a {
    max-width: 775px;
    line-height: 2;
    padding: 0 20px;
    margin-bottom: 30px;
    text-align: center;
    color: black;
}

@media screen and (max-width: 800px) {
    section {
        padding: 50px 20px;
    }
}

/* Header Styles */

header {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35px 100px 0;
    animation: 1s fadein 0.5s forwards;
    opacity: 0;
    color: white;
    overflow-x: hidden;
}

@keyframes fadein {
    100% {
        opacity: 1;
    }
}

header h2 {
    font-family: "Quicksand", sans-serif;
}

header nav {
    display: flex;
    margin-right: -15px;
}

header nav li {
    margin: 0 15px;
}

@media screen and (max-width: 800px) {
    header {
        padding: 20px 50px;
        flex-direction: column;
    }

    header h2 {
        margin-bottom: 15px;
    }

    header nav {
        margin-right: 0;
    }
}

/* Hero Styles */
.hero {
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    /*text-align: center;*/
    min-height: 100vh;
    color: white;
}

.hero .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    z-index: -1;
    background-color: #80a3db;
    background-position: 10% left;
}

.hero .layer {
    background-color: rgba(74, 74, 74, .4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.hero .hero-link-botom {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    opacity: 0;
    animation: 1s slidefade 1s forwards;
    text-align: center;
}
@media screen and (max-width: 500px) {
    .hero {
        display: none;
    }
}

.hero h1 {
    font: bold 60px "Open Sans", sans-serif;
    margin-bottom: 15px;
}

.hero h2 {
    font: normal 28px "Open Sans", sans-serif;
    margin-bottom: 40px;
    color: white;
}
.hero h3 {
    font: normal 20px "Open Sans", sans-serif;
    margin-bottom: 40px;
    color: white;
}
.hero h4 {
    font: normal 15px "Open Sans", sans-serif;
    margin-bottom: 40px;
    color: white;
}
.hero a.btn {
    padding: 20px 46px;
}

.hero-content-area {
    opacity: 0;
    margin-top: 100px;
    animation: 1s slidefade 1s forwards;
    text-align: center;

}

@keyframes slidefade {
    100% {
        opacity: 1;
        margin: 0;
    }
}

@media screen and (max-width: 800px) {
    .hero {
        min-height: 600px;
    }

    .hero h1 {
        font-size: 48px;
    }

    .hero h3 {
        font-size: 24px;
    }

    .hero a.btn {
        padding: 15px 40px;
    }
}

/* Destinations Section */
.destinations .grid li {
    display: flex;
    padding: 50px;
    flex-basis: 50%;
    align-items: center;
    flex-direction: column;
}
.destinations .grid li i {
    color: #183CA3;
}
.destinations .grid li h4 {
    font-size: 30px;
    margin: 25px 0;
}
.destinations .grid li a {
    color: #183CA3;
}
.destinations .grid li .containerImg{
    width:  200px;
    height: 240px;
}
.destinations .grid li .containerImg img{
    border-radius: 100%;
    width: 100%;
    height: auto;
}
@media screen and (max-width: 800px) {
    .destinations .grid li {
    flex-basis: 100%;
    padding: 20px;
    }
}

/* Auspiciadores Section */

.flex-container {
  padding-left: 3%;
  list-style: none;
  /*-ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;*/
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items:baseline;
  height: 100%;
  width: 100%;


}
.wrap {
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.flex-item {
    width: 300px;
  height: 200px;
  z-index: -1;
}

.flex-item-diinf {
    width: 400px;
  height: 300px;
  z-index: -1;
}
@media screen and (max-width: 800px) {
    .flex-container  {
    padding-left: 28%;
    }
}
@media screen and (max-width: 480px) {
    .flex-container  {
    padding-left: 1%;
    }
}


/* Packages Section */

.packages .grid li {
    padding: 50px;
    flex-basis: 50%;
    text-align: center;
}

.packages .grid li i {
    color: #8c9eff;
}

.packages .grid li h4 {
    font-size: 30px;
    margin: 25px 0;
}
.packages .grid li p {
    color:#EA771D
}
.packages .grid li h2 {
    color:#3f51b5
}

@media screen and (max-width: 800px) {
    .packages .grid li {
        flex-basis: 100%;
        padding: 20px;
    }
}

/* Testimonials Section */

.testimonials .quote {
    font-size: 22px;
    font-weight: 300;
    line-height: 1.5;
    margin: 40px 0 25px;
}

@media screen and (max-width: 800px) {
    .testimonials .quote {
        font-size: 18px;
        margin: 15px 0;
    }

    .testimonials .author {
        font-size: 14px;
    }
}

/* Contact Section */
.contact {
    padding: 0 !important;
    margin: 0 !important;
}


@media screen and (max-width: 1440px) {
    .contact form input {
        flex-basis: 100%;
        margin: 0 0 20px 0;
    }
}

/* Footer Section*/

footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    padding: 20px 0;
}

footer ul {
    display: flex;
}

footer ul li {
    margin-left: 16px;
}

footer p {
    text-transform: uppercase;
    font-size: 14px;
    opacity: 0.6;
    align-self: center;
}

@media screen and (max-width: 1100px) {
    footer {
        flex-direction: column;
    }

    footer p {
        text-align: center;
        margin-bottom: 20px;
        padding: 10px 20px;
    }

    footer ul li {
        margin: 0 8px;
    }
}
.contenedor-link{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}
.link-evic{
    width: 100%;
}

</style>
