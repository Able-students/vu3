
export const myMixin = {
    data(){
        return {
            username: 'test@gmail.com',
            count: 1
        }
    },
    methods: {
        alertData: () => {
          alert('It is alert')  
        }
    },
}

const ExampleMixin = {
    data() {
      return {
        message: 'Hello from mixin!'
      };
    },
    methods: {
      displayMessage(text) {
        console.log(text);
      }
    }
  };
  
  // Создаем компоненты, используя миксин
  export const ComponentA = {
    mixins: [ExampleMixin],
    mounted() {
      this.displayMessage('ComponentA');
    }
  };
  export const ComponentB = {
    mixins: [ExampleMixin],
    mounted() {
      this.displayMessage('ComponentB');
    }
  };
  