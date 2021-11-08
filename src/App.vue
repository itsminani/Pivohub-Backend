<template>
  <div id="app">
    <div id="nav" v-if="$route.name != 'Admin'">
      <b-navbar fixed-top>
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img class="imageLogo" alt="logo" src="./assets/logo.png" />
          </b-navbar-item>
        </template>
        <template #start>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            Home
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/about' }">
            About
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/admin' }">
            Admin
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/shop' }">
            Shop
          </b-navbar-item>
        </template>

        <template #end>
          <b-navbar-item tag="div">
            <div v-if="products">
              <a
                class="button is-primary"
                style="margin-right: 10px"
                v-if="products[0]"
                @click="navigate()"
              >
                <strong
                  ><b-icon
                    icon="cart"
                    class="cart"
                    style="margin-right: 3px"
                  ></b-icon>
                  Cart({{ products.length }})</strong
                >
              </a>
            </div>
            <div class="buttons">
              <div>
                <div v-if="user">
                  <div
                    class="navbar-item has-dropdown is-hoverable"
                    style="margin-right: 30px"
                  >
                    <a class="navbar-link">
                      <b-icon icon="account" style="margin-right: 10px">
                      </b-icon>
                      {{ user.attributes.name }}
                    </a>
                    <div class="navbar-dropdown">
                      <a
                        class="navbar-item"
                        tag="router-link"
                        :to="{ path: '/admin' }"
                      >
                        Admin Dashboard
                      </a>
                      <a class="navbar-item"> Profile </a>
                      <a class="navbar-item"> Settings </a>
                      <hr class="navbar-divider" />
                      <a class="navbar-item" @click="signOut()"> Logout </a>
                    </div>
                  </div>
                </div>
                <div v-if="!user">
                  <a @click="showRegister = true" class="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a @click="showLogin = true" class="button is-light">
                    Log in
                  </a>
                </div>
              </div>
              <a
                @click="install()"
                v-if="deferredPrompt"
                class="button is-centered is-success is-rounded"
              >
                <i class="fas fa-download"></i> Install
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
      <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <b-modal
          v-model="showRegister"
          has-modal-card
          trap-focus
          :destroy-on-hide="false"
          aria-role="dialog"
          aria-label="Example Modal"
          aria-modal
        >
          <template>
            <registerForm />
          </template>
        </b-modal>
      </transition>
      <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <b-modal
          v-model="showLogin"
          :destroy-on-hide="false"
          aria-role="dialog"
          aria-label="Example Modal"
          aria-modal
        >
          <template>
            <loginForm />
          </template>
        </b-modal>
      </transition>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <div class="container-max-width">
      <div class="">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <router-view />
        </transition>
      </div>
    </div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img class="image" alt="logo" src="./assets/logo.png" />
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item
          class="animate"
          href="https://github.com/itsminani/Pivohub-Backend"
        >
          This was made using
          <b-tag type="is-success" class="ml-2">
            <span class="icon">
              <i class="fab fa-vuejs"></i>
            </span>
            Vue Js</b-tag
          >
          <b-tag type="is-warning" class="ml-2">
            <span class="icon">
              <i class="fab fa-aws"></i>
            </span>
            AWS</b-tag
          >
          <b-tag type="is-link" class="ml-2">
            <span class="icon">
              <i class="fab fa-js-square"></i>
            </span>
            JS & TS</b-tag
          >
          <b-tag type="is-dark" class="ml-2">
            <span class="icon">
              <i class="fab fa-github"></i>
            </span>
            Github</b-tag
          >
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a
              href="https://github.com/itsminani"
              class="button is-dark is-outlined"
            >
              <span class="icon"> <i class="fab fa-github"></i> </span
              ><strong>My Git</strong>
            </a>
            <a
              href="https://www.linkedin.com/in/heritierlucminani/"
              class="button is-link"
            >
              <span class="icon"> <i class="fab fa-linkedin"></i> </span>My
              LinkedIn
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
AOS.init({
  once: false,
  mirror: true,
  duration: 600,
});
document.title = "PivoHub";
import { Auth } from "aws-amplify";
import { mapGetters } from "vuex";
import registerForm from "./components/registerForm.vue";
import loginForm from "./components/loginForm.vue";
export default {
  data() {
    return {
      showRegister: false,
      showLogin: false,
      deferredPrompt: null,
    };
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    },
    navigate() {
      this.$router.push({ name: "Cart" });
    },
    async signOut() {
      try {
        await Auth.signOut();
        console.log("Sign Out Complete");
        window.location.reload();
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
    pause() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Disclaimer :This is still <b>in development </b>,This site is not Responsive please view it on a PC😥.<br> This was developed in a very short time ... It really lacks a lot
        <br/>But Hey,..... I was able to add some backend functionalities such as Auth, full Shop and payment System using paypal.😁`,
        type: "is-success",
        position: "is-bottom",
        pauseOnHover: true,
      });
    },
  },
  computed: {
    ...mapGetters({
      user: "user/getUserSelf",
      products: "product/getProductsInCart",
    }),
  },
  created() {
    this.$store.dispatch("user/initialize");
    this.$store.dispatch("product/listProductsAction");
    this.pause();
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
    if (this.deferredPrompt) {
      console.log("I am Finally working");
    }
  },
  components: {
    registerForm,
    loginForm,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
.animate {
  animation-duration: 1s;
  transition: 0.3s;
}
.animate:hover {
  transform: scale(1.02);
  transition: 0.3s;
}
.cart {
  margin-right: 10px;
}
</style>
