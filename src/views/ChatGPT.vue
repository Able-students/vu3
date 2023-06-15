<template>
    <div>
        <textarea v-model="question" />
        <button @click="getResult">Send message</button>
        <!-- <chat-gpt agentid="your_agent_id" hostname="your_hostname"></chat-gpt> -->
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import { Configuration, OpenAIApi } from 'openai';

const question = ref('')

const configuration = new Configuration({
  apiKey: 'api key',
});
const openai = new OpenAIApi(configuration);

async function generateResponse(prompt) {
    const response = await openai.createCompletion({
      prompt: prompt,
      model: "text-davinci-001",
    });

  return response.choices[0].text.trim();
}

function getResult(){
    generateResponse(question.value).then((response) => {
        console.log(response);
    });
}

</script>



