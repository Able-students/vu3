
export function useTestData() {
    const data = 'some data';

    function printText(text){
        console.log(text)
    }

    return {
        data, printText
    }
}