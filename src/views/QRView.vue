<template>
    <div class="qr">
        <h1>{{ $t('qr_title') }}</h1>
        <p>{{ $t('qr_description') }}</p>
        <textarea class="qr-input" maxlength="60" v-model="qrText" @input="changeText" ></textarea>
        <label>{{ $t('select_color') }}</label>
        <input type="color" class="qr-color" v-model="qrColor" />
        <label>Select background color</label>
        <input type="color" class="qr-bgcolor" v-model="qrBgColor" />
        <button class="qr-btn" @click="generateQr">Generate QR</button>
        <QRCodeVue3  
            :value="qrText"  
            v-if="showQr"
            width="200"
            height="200"
            margin="5"
            class="qr-res"
            :backgroundOptions="{ color: qrBgColor }"
            :dotsOptions="{
                type: 'dots',
                color: qrColor,
            }"
            :cornersDotOptions="{ color: qrColor}"
            :cornersSquareOptions="{ color: qrColor}"
        />
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'QR',
    setup(){
        const qrText = ref('')
        const qrColor = ref('#000')
        const qrBgColor = ref('#fff')
        const showQr = ref(false)

        function generateQr(){
            showQr.value = true;
        }
        function changeText(){
            if(showQr.value){
                showQr.value = false;
            }
        }
        return {
            qrText,
            qrColor,
            qrBgColor,
            showQr,
            generateQr,
            changeText
        }
    }
}
</script>

<style>

img {
    margin-left: 25px !important;
}
.qr {
    background-color: rgb(169, 190, 247);
    padding: 29px;
    border-radius: 10px;
    width: max-content;
    margin: 5% auto auto;
    display: flex;
    flex-direction: column;
}

.qr label {
    margin: 10px 0;
}

.qr h1 {
    margin: 0;
}

.qr-btn {
    height: 50px;
    background-color: cornflowerblue;
    border-radius: 10px;
    border: none;
    margin: 20px 0;
    color: white;
    cursor: pointer;
}
</style>