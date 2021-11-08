<template>
  <div class="">
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-8 is-offset-2 register">
          <div class="columns">
            <div class="column left">
              <h1 class="title is-1">Request a demo from us</h1>
              <h2 class="subtitle colored is-4">It is FREE</h2>
              <p>
                Create an account so that you can book a demo and access your
                Dashboard
              </p>
            </div>
            <div class="column right has-text-centered">
              <h1 class="title is-4">Sign up today</h1>
              <div v-if="!showCodeVerify">
                <p class="description">Get an account with a free demo</p>
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium"
                      type="text"
                      placeholder="Name"
                      v-model="name"
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium"
                      type="email"
                      placeholder="Email"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium"
                      type="password"
                      placeholder="Password"
                      v-model="password"
                    />
                  </div>
                </div>
                <button
                  class="button is-block is-primary is-fullwidth is-medium"
                  type="submit"
                  @click="signUp()"
                >
                  Submit
                </button>
              </div>
              <div v-else>
                <div class="field">
                  <div class="control">
                    <p class="description is-8">
                      Please Enter Verification Code sent on your email
                    </p>
                    <input
                      class="input is-medium"
                      type="number"
                      placeholder="Enter Verification Code"
                      v-model="code"
                    />
                  </div>
                </div>
                <button
                  class="button is-block is-primary is-fullwidth is-medium"
                  type="submit"
                  @click="confirmSignUp()"
                >
                  Submit
                </button>
                <p>
                  Not receiving code?
                  <a style="color: blue" @click="resendConfirmationCode()"
                    >Click Here</a
                  >
                </p>
              </div>
              <br />
              <small><em>We are happy to have you.</em></small>
            </div>
          </div>
        </div>
        <div class="column is-8 is-offset-2">
          <br />
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span>
                &emsp;
                <span class="icon">
                  <i class="fab fa-facebook"></i>
                </span>
                &emsp;
                <span class="icon">
                  <i class="fab fa-instagram"></i>
                </span>
                &emsp;
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                &emsp;
                <span class="icon">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="level-right">
              <small class="level-item" style="color: var(--textLight)">
                &copy; Super Cool Website. All rights reserved.
              </small>
            </div>
          </nav>
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
      subject: "",
      email: "",
      password: "",
      name: "",
      code: "",
      showCodeVerify: false,
    };
  },
  methods: {
    async signUp() {
      this.showCodeVerify = true;
      let newUser = { attributes: {} };
      newUser.username = this.email;
      newUser.attributes.name = this.name;
      newUser.password = this.password;
      try {
        const { user } = await Auth.signUp(newUser);
        console.log(user);
        window.location.reload();
      } catch (error) {
        console.log("error signing up:", error);
      }
    },
    async confirmSignUp() {
      let username = this.email;
      let code = this.code;
      try {
        await Auth.confirmSignUp(username, code);
        console.log("Success");
      } catch (error) {
        console.log("error confirming sign up", error);
        alert("Please Enter the valid Code");
      }
    },
    async resendConfirmationCode() {
      let username = this.email;
      try {
        await Auth.resendSignUp(username);
        console.log("code resent successfully");
      } catch (err) {
        console.log("error resending code: ", err);
      }
    },
  },
};
</script>

<style>
:root {
  --brandColor: hsl(166, 67%, 51%);
  --background: rgb(247, 247, 247);
  --textDark: hsla(0, 0%, 0%, 0.66);
  --textLight: hsla(0, 0%, 0%, 0.33);
}

body {
  background: var(--background);
  height: 100vh;
  color: var(--textDark);
}

.field:not(:last-child) {
  margin-bottom: 1rem;
}

.register {
  margin-top: 10rem;
  background: white;
  border-radius: 10px;
}

.left,
.right {
  padding: 4.5rem;
}

.left {
  border-right: 5px solid var(--background);
}

.left .title {
  font-weight: 800;
  letter-spacing: -2px;
}

.left .colored {
  color: var(--brandColor);
  font-weight: 500;
  margin-top: 1rem !important;
  letter-spacing: -1px;
}

.left p {
  color: var(--textLight);
  font-size: 1.15rem;
}

.right .title {
  font-weight: 800;
  letter-spacing: -1px;
}

.right .description {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  color: var(--textLight);
  font-size: 1.15rem;
}

.right small {
  color: var(--textLight);
}

input {
  font-size: 1rem;
}

input:focus {
  border-color: var(--brandColor) !important;
  box-shadow: 0 0 0 1px var(--brandColor) !important;
}

.fab,
.fas {
  color: var(--textLight);
  margin-right: 1rem;
}
</style>
