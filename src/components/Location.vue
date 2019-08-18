
<template>
  <div>
    <div class= "contenedor-exterior">
      <div class ="contenedor-nombre">
        <div>
          <h3>Location</h3>
        </div>
        <div>
          <hr>
        </div>
      </div>
      <div class="contenedor-interior">
        <div class="contenedor-nombre">
          <h3>
            {{ direccion }}
          </h3>
        </div>
      </div>
    </div>
    <div>

    </div>
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
    <div class="overlay" v-if="spinner">
      <div>
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="65"
          color="#EA771D"
        />
      </div>
    </div>
    <div v-else class= "contenedor-exterior">
        <div
        class ="contenedor-interior"
        v-for="(value, index) in firebaseInformacion"
        v-bind:key="index">
          <div class="name">
            <h3>
              {{ value.nombre }}
            </h3>
          </div>
          <div class="info">
            <h3>
              {{ value.descripcion}}
            </h3>
          </div>
        </div>
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
      title: 'Program',
      users: [],
      direccion: '',
      spinner: true,
      infoUbicacion: {},
      txtMark: 'EVIC',
      firebaseInformacion: {},
      center: { lat: 0, lng: 0 },
      markers: [
        {
          position: { lat: 0, lng: 0 },
        },
      ],
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
        this.infoUbicacion = snapshot.val().ubicacion;
        this.firebaseInformacion = this.infoUbicacion.indicaciones;
        this.direccion = this.infoUbicacion.direccion;
        this.center.lat = Number(snapshot.val().ubicacion.lat);
        this.center.lng = Number(snapshot.val().ubicacion.long);
        this.markers[0].position.lat = Number(snapshot.val().ubicacion.lat);
        this.markers[0].position.lng = Number(snapshot.val().ubicacion.long);

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
.contenedor-exterior{
  display: flex;
  flex-direction: column;
  padding: 4% 10% 2% 10%;
}
.name h3{
  font-size: 3.0em;
  font-weight: lighter;
  color: #4a4a4a;
  padding-bottom: 1%;
}
.info{
    border-left: 1px solid #EA771D;
    border-bottom: 1px dashed #EA771D;
    /*float: left;*/
}
.info h3{
  font-weight: lighter;
  font-size: 1.2em;
  padding: 1% 2% 2% 2%;
}
.contenedor-interior{
  margin: 2% 0% 2% 0%;
}
.contenedor-interior-mapa{
  margin: 0 !important;
  padding: 0 !important;
}
.contenedor-nombre{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
}
.contenedor-nombre h3{
  text-transform: capitalize;
  font: bold 32px "Open Sans", sans-serif;
  /*margin-bottom: 30px;*/
}
.contenedor-dir{
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}
.contenedor-dir h3{
  font-size: 3.0em;
  font-weight: lighter;
  color: #4a4a4a;
  padding-bottom: 1%;
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
hr {
    width: 240px;
    height: 3px;
    background-color: #EA771D;
    border: 0;
    margin-bottom: 50px;
}
/* Contact Section */
.contact {
    padding: 0 !important;
}


@media screen and (max-width: 1440px) {
    .contact form input {
        flex-basis: 100%;
        margin: 0 0 20px 0;
    }
}
</style>
