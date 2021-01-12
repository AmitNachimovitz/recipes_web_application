<template>
  <div class="container">
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="link"
        style="width:100px;display:block;color:white;font-size:18pt;"
        class="mx-auto w-100"
      >Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register">Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >Login failed: {{ form.submitError }}</b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: ""
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/login",
          {
            username: this.form.username,
            password: this.form.password
          }
        );

        this.$root.store.login(this.form.username);
        this.$router.push("/").catch(()=>{});
        this.$forceUpdate();
      } catch (err) {
        this.$root.toast("Login", err.response.data.message, "danger");
      }
    },
    onLogin() {
      this.form.submitError = "";
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "PoiretOne";
  src: url("../assets/fonts/PoiretOne-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
.container {
  max-width: 400px;
  font-family: "PoiretOne";
  color: black;
  font-size: 16pt;
  font-weight: bold;
}

.form-control{
  border-color: transparent;
}

.form-control:focus {
  border-color: transparent;
  box-shadow: none;
}

</style>