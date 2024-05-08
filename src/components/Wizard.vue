<template>
  <form @submit="onSubmit">
    <slot />

    <div class="flex">
      <button
        :disabled="!hasPrevious"
        id="btn-prev"
        :class="{ 'opacity-50': !hasPrevious }"
        class="px-4 mr-1 mt-3 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300"
        type="button"
        @click="goToPrev"
      >
        Previous
      </button>
      <button
        :disabled="isLastStep"
        id="btn-next"
        :class="{ 'opacity-50': isLastStep }"
        class="px-4 mt-3 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300"
        type="submit"
      >
        Next
      </button>
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
