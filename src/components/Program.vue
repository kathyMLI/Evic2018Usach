
<template>
  <div>
    <div class= "contenedor-exterior">
      <div class ="contenedor-nombre">
        <div>
          <h3>Program</h3>
        </div>
        <div>
          <hr>
        </div>
      </div>
      <div class="contenedor-interior">
        <div class="contenedor-nombre">
          <h3>
            {{ fecha }}
          </h3>
        </div>
      </div>
    </div>
    <div>
    </div>
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
        v-for="(value, index) in programa"
        v-bind:key="index">
          <div class="name">
            <h3>
              {{ value.num }}
            </h3>
          </div>
          <div class="info"
          v-for="(value, index) in value.horario"
          v-bind:key="index">
            <h3>
              <div class = "event-time">
               {{ value.hora }} -
              </div>
              <div class = "event-name">
                {{ value.descripcion }}
              </div>
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
      spinner: true,
      fecha: '',
      programa: {},
      days: 0,
      temporal: {},
      firebaseInformacion: {},
    };
  },
  methods: {
    setData() {
      const starCountRef = firebase.database().ref('/');
      starCountRef.once('value', (snapshot) => {
        this.fecha = snapshot.val().fecha;
        this.programa = snapshot.val().programa;
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
.event-time{
  font-weight: normal;
  font-size: 1.5em;
  color:#EA771D;
}
.event-name {
  font-weight: lighter;
  font-size: 1.2em;
}
</style>
