<template>
  <div>
 <header>
  <div class ="logo">
    <img :src="logo">
  </div>
  <i class="fa fa-bars hamburger"></i>
  <nav id="menu">
    <a><router-link :to="{ name: 'About'}">ABOUT EVIC</router-link></a>
    <a><router-link :to="{ name: 'Program'}">PROGRAM</router-link></a>
    <a><router-link :to="{ name: 'Speakers'}">EXPERTS</router-link></a>
    <a><router-link :to="{ name: 'Competition'}">COONTEST</router-link></a>
    <a><router-link :to="{ name: 'Location'}">LOCATION</router-link></a>
  </nav>
</header>
   <div class = "putmargin">
      <transition name="fade-down" mode="out-in" appear>
      <router-view></router-view>
    </transition>
   </div>
<footer>
    <p> {{footer}}</p>
</footer>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {

  data() {
    return {
      titulo: '',
      footer: '',
      logo: '',
    };
  },
  methods: {
    setData() {
      const starCountRef = firebase.database().ref('/');
      starCountRef.once('value', (snapshot) => {
        this.titulo = snapshot.val().titulo;
        this.footer = snapshot.val().footer;
        this.logo = snapshot.val().logo;
      });
    },
  },
  mounted() {
    this.setData();
  },
};
</script>

<style scoped>

nav {
    list-style: none;
    margin-top: 1%;
}

a {
    text-decoration: none;
    opacity: 0.75;
    color: #183ca3;
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
ul {
    list-style: none;
}

hr {
    width: 250px;
    height: 3px;
    background-color: #3f51b5;
    border: 0;
    margin-bottom: 50px;
}
/* Header Styles */

header {
    background:white;
    display:flex;
    justify-content:space-between;
    margin: 20px 0 20px 0;
    }
.logo {
    width: 20%;
}
.hamburger {
    padding:0 0.5em;
    font-size:1.5em;
    line-height:50px;
    display:inline-block;
    z-index:2;}

nav {
    position:absolute;
    width:100%;
    background:white;
    display:none;
    }
nav:hover {
    display:block;
    }
nav a {
    display:block;
    line-height:50px;
    text-align:center;
    }

.hamburger:hover ~ nav {
    display:block;
    }

@media only screen and ( min-width: 768px )
{
  .hamburger {
      display:none;
      }
  nav {
      position:static;
      display:flex;
      background:none;
      clear:none;
      flex:1;
      justify-content:flex-end;
      }
  nav:hover {
      display:flex;
      }
  nav a {
      padding:0 1em;
      }
}

/* Footer Section*/

footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color:#EA771D;
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
.fade-down-enter-active {
    animation-name: fadeInDown;
    animation-duration: 0.1s;
}

.fade-down-leave-active {
    animation-name: fadeOutDown;
    animation-duration: 0.1s;
}

@keyframes fadeInDown {
  from { opacity: 0.05; transform: translate3d(0, -25px, 0); }
  to { opacity: 1; transform: none; }
}

@keyframes fadeOutDown {
  from {  opacity: 1; transform: none; }
  to { opacity: 0.05; transform: translate3d(0, -25px, 0); }
}

</style>
