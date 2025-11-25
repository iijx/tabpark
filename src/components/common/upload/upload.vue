<template>
  <div v-for="(item) of uploadList" :key="item.uid" class="upload-container flex-align-center">
    <template v-if="item.status === 'success'">
      <audio v-if="type === 'audio'" :src="item.url" controls></audio>
      <img v-if="type === 'img'" :src="item.url" />
      <div class="del-icon-wrap" @click="onDelete(item.uid)">
        <icon-delete-four theme="filled" size="24" :fill="color" :strokeWidth="2" />
      </div>
    </template>
    <a-progress v-else :percent="item.percent"></a-progress>
  </div>
  <div v-if="uploadList.length <= 0 || multiple" class="upload-slot" @click="handleUploadBtn">
    <input ref="refInput" type="file" @click.stop :multiple="multiple" @change="inputChange" />
    <div>
      <icon-upload />
      <span class="ml-2">点此上传</span>
    </div>
  </div>
</template>

<script lang="ts" setup name="Upload">
import { appState } from '@/compositions/use-app/app-state';
import { useUpload } from './use-upload';
const emits = defineEmits(['filechange']);
const color = ref(appState.themeColor['--i-fg-2']);
const props = defineProps({
  multiple: {
    type: Boolean,
    default: true
  },
  value: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'audio'
  },
  dir: {
    type: String,
    default: '/quesAudio'
  },
  beforeUpload: {
    type: Function,
    default: () => {}
  }
})

const { uploadList, addFiles, onDelete } = useUpload({
  dir: props.dir || '/',
  defaultUploadList: (props.value || []) as string[]
});

const inputChange = (e: any) => {
  const files = e.target.files;
  addFiles(Array.prototype.slice.call(files)).then(() => {
    console.log('will emit filechange', uploadList)
    emits('filechange', uploadList)
  })
}

const refInput = ref<HTMLElement>();
const handleUploadBtn = () => {
  let isOK = true;
  if (props.beforeUpload) {
    isOK = props.beforeUpload();
  }
  console.log("isOK", isOK);
  if (isOK) {
    refInput.value?.click();
  }

}
</script>

<style lang="less">
.upload-container {
  position: relative;
}
.flex-align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.del-icon-wrap {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
.upload-slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px dashed #ccc;
  cursor: pointer;
  input {
    display: none;
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  div {
    display: flex;
    align-items: center;
  }
}
</style>