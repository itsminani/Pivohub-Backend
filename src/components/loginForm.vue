<template>
  <div>
    <section class="hero is-white">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="">
            <h3 class="title has-text-primary">Login</h3>
            <hr class="login-hr" />
            <p class="subtitle has-text-black">Please login to proceed.</p>
            <div class="box">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="email"
                    placeholder="Your Email"
                    v-model="email"
                    autofocus=""
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox" v-model="checkBox" />
                  Remember me
                </label>
              </div>
              <button
                class="button is-block is-primary is-large is-fullwidth"
                @click="signIn()"
              >
                Login <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </div>
            <p class="has-text-grey">
              <a href="#">Sign Up</a> &nbsp;·&nbsp;
              <a href="#">Forgot Password</a> &nbsp;·&nbsp;
              <a href="#">Need Help?</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  data() {
    return {
      email: "",
      password: "",
      checkBox: true,
    };
  },
  methods: {
    async signIn() {
      let username = this.email;
      let password = this.password;
      try {
        const user = await Auth.signIn(username, password);
        console.log(user);
        window.location.reload();
      } catch (error) {
        console.log("error signing in", error);
      }
    },
  },
};
</script>

<style>
hero {
  max-width: 100px;
}
</style>
