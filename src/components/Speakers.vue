
<template>
  <div>
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
      <div class ="contenedor-nombre">
        <div>
          <h3>Oradores</h3>
        </div>
        <div>
          <hr>
        </div>
      </div>
        <div
        class ="contenedor-interior"
        v-for="(value) in firebaseInformacion"
        v-bind:key="value.name">
          <div class="name">
            <h3>
              {{ value.name }}
            </h3>
          </div>
          <div class="info">
            <h3>
              {{ value.larga}}
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
      firebaseInformacion: {},
      textAboutEvic: 'El objetivo de la Escuela de Verano es promover la Inteligencia Computacional, reuniendo áreas más amplias tales como Control Inteligente y Sistemas, Robótica, Visión por Computador, Neurociencia Computacional, Ciencia de Datos y Big Data, entre otros, y difundir tanto los conocimientos básicos como las últimas investigaciones entre estudiantes de pregrado y postgrado, profesores universitarios y profesionales de Chile y otros países latinoamericanos.',
      center: { lat: -33.4504466, lng: -70.6827894 },
      markers: [
        {
          position: { lat: -33.4504466, lng: -70.6827894 },
        },
      ],
    };
  },
  methods: {
    setData() {
      const starCountRef = firebase.database().ref('plenaria');
      starCountRef.once('value', (snapshot) => {
        this.firebaseInformacion = snapshot.val();
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
hr {
    width: 240px;
    height: 3px;
    background-color: #EA771D;
    border: 0;
    margin-bottom: 50px;
}
</style>
