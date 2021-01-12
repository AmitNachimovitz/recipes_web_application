<template>
 <b-container fluid id="container">
   <b-row>
     <b-col>
       <blockquote id="quote">
            "If you really want to make a friend, go to someone's house and eat with him -
            the people who give you their food give you their heart."
       </blockquote> 
     </b-col>  
   </b-row>  
    <b-row>
      <b-col>
        <div id="registerContainer">
          <img id="img" src="../assets/images/register.jpg"/>
    <b-form id="form" @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
          First name length should be between 2-15 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
          First name should contain only letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.lastName.length">
          Last name length should be between 2-15 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
          Last name should contain only letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username should contain only letters 
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email is invalid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-imgURL"
        label-cols-sm="3"
        label="Image URL:"
        label-for="imgURL"
      >
        <b-form-input
          id="imgURL"
          v-model="$v.form.imgURL.$model"
          type="text"
          :state="validateState('imgURL')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.imgURL.required">
          Image URL is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.imgURL.url">
          Image URL is invalid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should contain at least one number and one special character
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Password length should be between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required /*&& $v.form.password.length */ && !$v.form.password.check"
        >
      
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      <b-button
        type="submit"
        variant="link"
        style="width:250px;color:white;font-size:18pt;"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        imgURL: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
      regex: RegExp('^(?=.*[0-9])(?=.*[@#$%^&-+=()])(?=\\S+$).{5, 10}$')
    };
  },
  validations: {
    form: {
      firstName: {
        required,
        length: (u) => minLength(2)(u) && maxLength(15)(u),
        alpha
      },
      lastName: {
        required,
        length: (u) => minLength(2)(u) && maxLength(15)(u),
        alpha
      },
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      email: {
        required,
        email
      },
      imgURL: {
        required,
        url
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        check: (p) => RegExp('^(?=.*[0-9])(?=.*[!@#$%^&-+=()])[A-Za-z\\d@$!%*#?&]{5,10}$').test(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/register",
          {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            username: this.form.username,
            email: this.form.email,
            country: this.form.country,
            password: this.form.password,
            imgURL: this.form.imgURL,
          }
        );

        if (response.status == '201') {
          this.$router.push("login");
        }

      } catch (err) {
        this.$root.toast("Register", err.response.data.message, "danger");
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    // onReset() {
    //   this.form = {
    //     username: "",
    //     firstName: "",
    //     lastName: "",
    //     country: null,
    //     password: "",
    //     confirmedPassword: "",
    //     email: ""
    //   };
    //   this.$nextTick(() => {
    //     this.$v.$reset();
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "NanumPenScript";
  src: url("../assets/fonts/NanumPenScript-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "PoiretOne";
  src: url("../assets/fonts/PoiretOne-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}

#container {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

#registerContainer{
  display: inline-block;  
  position: relative;
  object-fit: cover;
  z-index:1;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  margin-top: 20px;
}

.input{
  max-width: 100px;
}

.form-control{
  border-color: black;
}

.form-control:focus {
  border-color: black;
  box-shadow: none;
}

.form-group{
background-color: black;
}

#quote{
  max-width: 500px;
  font-family: "NanumPenScript";
  margin-left: auto;
  margin-right: auto;
  //padding-bottom: 20px;
  font-size: 20pt;
}

#form{
  color: white;
  max-width: 30%;
  font-family: "PoiretOne";
  font-size: 12pt;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index:2;
}

#img{  
  //opacity: 0.8;
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

</style>
