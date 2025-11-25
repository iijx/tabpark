<script lang="ts" setup>
import { Pin, DialogType } from '@/interface';

const props = defineProps({
    show: Boolean,
    type: { type: String, default: DialogType.ADD},
    item: Pin
})
const emits = defineEmits(['complete', 'close'])
const curStep = ref(1);
const curTitle = computed(() => curStep.value === 1 ? `${props.type === DialogType.ADD ? '创建新文件夹' : '更新资料'}` :  '选择颜色');
const info = reactive({
    name: props.item?.name || '',
})
const create = () => emits('complete', { name: info.name });
const colors = ['#000', '#8e8e93', '#c7c7cc', '#017Aff', '#59adc4', '#27cd41', '#5856d6', '#af52de', '#ff2c55', '#ff3b30', '#ff9502', '#ffcc00'];
const iconCloseClick = () => {
    if (curStep.value === 2) curStep.value = 1;
    else emits('close');
}
const colorClick = (color: string) => {
    curStep.value = 1;
}
watch(() => props.show, () => {
    if (props.show && props.type === DialogType.EDIT) {
        info.name = props.item?.name || '';
    }
})
</script>

<template>
    <input type="checkbox" class="modal-toggle" :checked="props.show">
    <div class="modal cursor-pointer" @click="emits('close')">
        <main class="modal-box relative text-base-content" style="max-width: 24rem;" @click.stop.prevent="">
            <section class="flex">
                <div class="text-md font-bold leading-6 grow">{{curTitle}}</div>
                <div @click="iconCloseClick" class="btn btn-xs btn-circle bg-base-300 border-base-300">✕</div>
            </section>
            <section class="leading-9 relative">
                <input type="text" v-model.trim="info.name" class="w-full input input-bordered mt-3" placeholder="文件夹名称"/>
                <div class="h-12 mt-3 flex items-center input border-opacity-20 cursor-pointer" @click="curStep = 2">
                    <span class="grow text-base-content">颜色</span>
                    <div class="w-6 h-6 rounded-lg bg-black mr-2"></div>
                    <icon-right theme="outline" size="24" fill="#b3b3b3" :strokeWidth="3"/>
                </div>
                <button @click="create" class="btn btn-block mt-4" :class="{'btn-disabled': !info.name.trim()}">{{type === DialogType.ADD ? '创建' : '更新资料'}}</button>
                <section v-show="curStep === 2" class="absolute inset-0 bg-base-100 py-4 grid grid-cols-6">
                    <div class="flex justify-center items-center" v-for="item of colors" :key="item" @click="colorClick(item)">
                        <button class="btn btn-square hover:scale-110"  :style="{background: item}"></button>
                    </div>
                </section>
            </section>
        </main>
    </div>
</template>

<style scoped>

</style>
