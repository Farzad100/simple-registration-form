<template>
  <div>
    <FormWizard :validation-schema="validationSchema">
      <FormStep>
        <h1 class="font-bold tracking-wide text-2xl text-gray-900 mb-4">
          Step: username
        </h1>
        <Field
          id="username"
          class="mb-2 px-2 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
          name="username"
          type="text"
          placeholder="Type your username"
        />
        <ErrorMessage
          name="username"
          class="text-red-600 mt-3 mb-6 font-bold"
        />
      </FormStep>

      <FormStep>
        <h1 class="font-bold mb-4 tracking-wide text-2xl text-gray-900">
          Step: email
        </h1>
        <Field
          id="email"
          class="mb-2 px-2 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
          name="email"
          type="email"
          placeholder="Type your email"
        />
        <ErrorMessage name="email" class="text-red-600 mt-3 mb-6 font-bold" />
      </FormStep>

      <FormStep>
        <h1 class="font-bold mb-4 tracking-wide text-2xl text-gray-900">
          Step: review
        </h1>
        <h3 class="font-bold mb-3 text-sm">
          Username: {{ getUserData.username }}
        </h3>
        <h3 class="font-bold mb-3 text-sm">Email: {{ getUserData.email }}</h3>
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
