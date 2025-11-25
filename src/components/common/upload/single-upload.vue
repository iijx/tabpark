<template>
  <Upload v-if="fileList.length > 0" :value="fileList" :multiple="false" @filechange="fileChange" :type="type" :dir="dir" :beforeUpload="beforeUpload">
    <slot />
  </Upload>

  <Upload v-else :value="[]" :multiple="false" @filechange="fileChange" :type="type" :dir="dir" :beforeUpload="beforeUpload">
    <slot />
  </Upload>
</template>

<script setup name="SingleUpload" lang="ts">
import Upload from './upload.vue';

const props = defineProps({
    fileValue: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'audio'
    },
    dir: {
        type: String,
        default: '/'
    },
    beforeUpload: {
        type: Function,
        default: () => {}
    }
})

const emits = defineEmits(['update']);
let fileList = reactive(props.fileValue ? [props.fileValue] : []);

console.log('fileList', fileList);

watchEffect(() => {
    if (props.fileValue) {
        fileList.shift();
        fileList.push(props.fileValue)
    }
})
const fileChange = (res: any) => {
    emits('update', ((res && res[0]) ? res[0].url : '').replace('https://bing.pastecuts.cn', ''));
}
</script>