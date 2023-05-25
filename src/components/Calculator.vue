<template>
    <div class='calculator'>
        <div class='buttons'>
            <h3 ref="h3">{{result}}</h3>
            <button @click="clear">AC</button>
            <button @click="appendOperator">+/-</button>
            <button @click="appendOperator">%</button>
            <button @click="appendOperator">/</button>
            <button @click="appendNumber">7</button>
            <button @click="appendNumber">8</button>
            <button @click="appendNumber">9</button>
            <button @click="appendOperator">*</button>
            <button @click="appendNumber">4</button>
            <button @click="appendNumber">5</button>
            <button @click="appendNumber">6</button>
            <button @click="appendOperator">-</button>
            <button @click="appendNumber">1</button>
            <button @click="appendNumber">2</button>
            <button @click="appendNumber">3</button>
            <button @click="appendOperator">+</button>
            <button class='zero-btn' @click="appendNumber">0</button>
            <button @click="appendNumber">.</button>
            <button @click="calculate">=</button>
        </div>
    </div>
</template>

<script>
import Menu from './Menu.vue';
import { ref, onMounted, onUpdated } from 'vue';
export default {
    name: 'Calculator',
    // props: ['count']
    props: {
        count: {
            type: Number,
            default: 0,
            required: true
        }
    },
    emits: ['printResult'],
    components: [Menu],
    setup(props) {
        const number1 = ref(0)
        const h3 = ref()
        const operand = ref(null)
        const result = ref(0)
        onMounted(() => {
            console.log('DOM is mounted')
        })
        onUpdated(() => {
           console.log('DOM is onUpdated') 
        })
        const appendNumber = (e) => {
            if(result.value.toString().length > 18){
                h3.value.style.fontSize = '18px'
            }
            if(result.value.toString().length > 34){
                h3.value.style.fontSize = '14px'
            }
            if(+result.value === 0 && (e.target.textContent !== '.' || e.target.textContent === '0')){
                result.value = e.target.textContent;
            }else{
                result.value += e.target.textContent;
            }
        }
        const clear = () => {
            result.value = 0;
        }
        const calculate = () => {
            result.value = eval(number1.value + operand.value + result.value);      
        }
        const appendOperator = (e) => {
            if(e.target.textContent === '%'){
                result.value = +result.value / 100
                return
            }
            if(e.target.textContent === '+/-'){
                if(result.value.toString().charAt(0) === '-'){
                    result.value = Math.abs(result.value)
                }else{
                    result.value = '-' + result.value
                }      
                return
            }
            operand.value = e.target.textContent;
            number1.value = result.value;
            result.value = 0
        }
        return {
            appendNumber,
            appendOperator,
            calculate,
            result,
            clear,
            h3
        }
    },
    watch: {
        number1(newValue,oldValue){

        },
        result(newValue,oldValue){
            
        }
    }
}
</script>

<style scoped>
.calculator{
    margin: 20px;
}
.buttons{
    display: grid;
    grid-template-columns: repeat(4,80px);
    grid-gap: 5px;
}

.buttons h3 {
    grid-column: span 4;
    justify-content: flex-end;
    align-items: flex-end;
    border-radius: 12px;
    border: 1px solid grey;
    overflow: hidden;
    padding: 4px;
    height: 40px;
    display: flex;
}

button {
    border-radius: 12px;
    border: none;
    height: 40px;
    font-size: 22px;
    font-weight: 500;
    background: grey;
    color: white;
}
.zero-btn {
    grid-column: span 2;
}
h3 {
    font-size: 32px;
    font-weight: 500;
}
</style>