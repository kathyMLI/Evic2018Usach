<template>
  <div>
    <div class= "contenedor-exterior">
      <div class ="contenedor-nombre">
        <div>
          <h3>Concurso de posters</h3>
        </div>
        <div>
          <hr>
        </div>
      </div>
    </div>
    <div>
      <div v-if="moreInformation==0">
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
            <div v-if="value.mostrar==1">
              <div class="name">
                <h3>
                  {{ value.titulo }}
                </h3>
              </div>
              <div class="info"
                v-for="(info, index) in value.informacion"
                v-bind:key="index">
                <h4>
                  {{info.nombre}}
                </h4>
                <h3>
                  {{info.data}}
                </h3>
              </div>
            </div>
            </div>
        </div>
      </div>
      <div v-else class ="pantalla-mas-informacion">
        <h3>
          {{msjeMasInformacion}}
        </h3>
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
      showWinner: '0',
      msjeMasInformacion: '',
      moreInformation: '',
    };
  },
  methods: {
    setData() {
      const starCountRef = firebase.database().ref('/');
      starCountRef.once('value', (snapshot) => {
        this.firebaseInformacion = snapshot.val().concurso;
        this.moreInformation = snapshot.val().cortina.mostrar;
        this.msjeMasInformacion = snapshot.val().cortina.texto;
        this.spinner = false;
      });
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
    display: flex;
    flex-direction: row;
    /*float: left;*/
}
.info h3{
  font-weight: lighter;
  font-size: 1.2em;
  padding: 1% 2% 2% 2%;
}
.info h4{
  font-weight: bold;
  font-size: 1.2em;
  padding: 1% 2% 2% 2%;
}
.pantalla-mas-informacion{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20% 0 100% 0;
}
.pantalla-mas-informacion h3{
  font: bold 60px "Open Sans", sans-serif;
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
