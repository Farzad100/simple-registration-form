<template>
  <form @submit="onSubmit">
    <slot />

    <div>
      <button v-if="hasPrevious" id="btn-prev" type="button" @click="goToPrev">
        Previous
      </button>
      <button v-if="!isLastStep" id="btn-next" type="submit">Next</button>
    </div>
  </form>
</template>

<script>
  import { useForm } from 'vee-validate';
  import { ref, computed, provide } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'FormWizard',
    emits: ['next', 'submit'],
    props: {
      validationSchema: {
        type: Array,
        required: true,
      },
    },
    setup(props, { emit }) {
      const formData = ref({});
      const currentStepIdx = ref(0);
      const store = useStore();

      const stepCounter = ref(0);
      provide('STEP_COUNTER', stepCounter);

      provide('CURRENT_STEP_INDEX', currentStepIdx);

      const isLastStep = computed(() => {
        return currentStepIdx.value === stepCounter.value - 1;
      });

      const hasPrevious = computed(() => {
        return currentStepIdx.value > 0;
      });

      const currentSchema = computed(() => {
        return props.validationSchema[currentStepIdx.value];
      });

      const { resetForm, handleSubmit } = useForm({
        validationSchema: currentSchema,
      });

      const onSubmit = handleSubmit((values) => {
        formData.value = {
          ...formData.value,
          ...values,
        };

        if (!isLastStep.value) {
          currentStepIdx.value++;
          emit('next', formData.value);
          store.commit('addUserData', formData.value);

          return;
        }
      });

      function goToPrev() {
        if (currentStepIdx.value === 0) {
          return;
        }

        currentStepIdx.value--;
        resetForm({
          values: {
            ...formData.value,
          },
        });
      }

      return {
        onSubmit,
        hasPrevious,
        isLastStep,
        goToPrev,
      };
    },
  };
</script>
