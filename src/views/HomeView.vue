<template>
  <div>
    <FormWizard :validation-schema="validationSchema">
      <FormStep>
        <h1>Step: username</h1>
        <Field
          id="username"
          name="username"
          type="text"
          placeholder="Type your username"
        />
        <ErrorMessage name="username" />
      </FormStep>

      <FormStep>
        <h1>Step: email</h1>
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="Type your email"
        />
        <ErrorMessage name="email" />
      </FormStep>

      <FormStep>
        <h1>Step: review</h1>
        <h3>Username: {{ getUserData.username }}</h3>
        <h3>Email: {{ getUserData.email }}</h3>
      </FormStep>
    </FormWizard>
  </div>
</template>

<script>
  import { Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { useStore } from 'vuex';
  import FormWizard from '@/components/Wizard.vue';
  import FormStep from '@/components/FormSteps.vue';
  import { computed } from 'vue';

  export default {
    name: 'App',
    components: {
      FormWizard,
      FormStep,
      Field,
      ErrorMessage,
    },
    setup() {
      const store = useStore();
      const validationSchema = [
        yup.object({
          username: yup.string().required().label('Full Name'),
        }),
        yup.object({
          email: yup.string().required().email().label('Email Address'),
        }),
      ];
      const getUserData = computed(() => store.state.userData);

      return {
        getUserData,
        validationSchema,
      };
    },
  };
</script>

<style>
  input,
  select {
    margin: 10px 0 10px;
    width: 400px;
    height: 50px;
    padding: 0 10px;
    font-size: 20px;
    display: block;
  }
  h1 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  button {
    margin-top: 20px;
  }
  span {
    color: red;
  }
  h3 {
    line-height: 1.5;
  }
</style>
