<template>
    <main class="search-container">
        <div class="sub-title">搜索引擎</div>
        <transition-group name="i-all" tag="section" class="i-block" v-if="usedList.length">
            <div class="item" v-for="(item, index) of usedList" :key="item.searchEngineEnum">
                <img class="icon" :src="item.icon" :style="{backgroundColor: item.iconColor}"/>
                <div class="label">{{ item.cnName }}</div>
                <!-- <icon-hamburger-button theme="outline" size="24" fill="#333"/> -->
                <!-- <span>移除</span> -->
                <span class="ml-4">移除</span>
                <!-- <icon-cutting-one theme="outline" size="20" fill="currentColor"  class="mx-2" @click="handleRemove(item.searchEngineEnum)"/> -->
            </div>
        </transition-group>

        <div class="sub-title">您可添加</div>
        <transition-group name="i-all" tag="section" class="i-block">
            <div class="item" :class="item.searchEngineEnum" v-for="(item, index) of noUsedList" :key="item.name">
                <img class="icon" :class="item.searchEngineEnum" :src="item.icon" :style="{backgroundColor: item.iconColor}" />
                <div class="label">{{ item.cnName }}</div>
                <span @click="handleAdd(index)">添加</span>
            </div>
        </transition-group>
    </main>
</template>

<script lang="ts" setup name="SearchConfigItem">
import { WEB_SITES_DEFAULT } from '@/config';
import { SearchEngineEnum, SearchWebSite } from '@/interface';
const { settingState }  = useApp().appState;

const usedList = ref<SearchWebSite[]>([]);

const noUsedList = ref<SearchWebSite[]>([]);

watch(() => settingState.searchEngines, (newVal) => {
    usedList.value = [...WEB_SITES_DEFAULT].filter(i => newVal.includes(i.searchEngineEnum));
    noUsedList.value = WEB_SITES_DEFAULT.filter((item) => !newVal.includes(item.searchEngineEnum))
}, { immediate: true, deep: true });


const handleRemove = (key: SearchEngineEnum) => {
    const index = settingState.searchEngines.findIndex((item) => item === key);
    settingState.searchEngines.splice(index, 1);
}

const handleAdd = (index: number) => {
    settingState.searchEngines.push(noUsedList.value[index].searchEngineEnum);
}

const handleMove = (key: SearchEngineEnum, isUp: 'up' | 'down') => {
    const index = settingState.searchEngines.findIndex((item) => item === key);
    if (isUp === 'up') {
        if (index === 0) return;
        console.log(settingState.searchEngines)
        const temp = [settingState.searchEngines[index], settingState.searchEngines[index - 1]];
        settingState.searchEngines.splice(index - 1, 2, ...temp); // [index] = temp;
        console.log(settingState.searchEngines)
    } else {
        if (index === settingState.searchEngines.length - 1) return;
        const temp = settingState.searchEngines[index + 1];
        settingState.searchEngines[index + 1] = settingState.searchEngines[index];
        settingState.searchEngines[index] = temp;
    }
}


</script>

<style lang="less" scoped>
@import "tailwindcss";

.search-container {
    overflow: scroll;
    height: 100%;
}
.i-block {
    @apply rounded-md cursor-pointer;
    border: 1px solid var(--i-fg-3);
    overflow: hidden;
}
.sub-title {
    font-weight: bold;
    margin-top: 18px;
    margin-bottom: 12px;
    font-size: 14px;
}
.item {
    @apply flex items-center py-1 px-2;
    border-bottom: 1px solid var(--i-fg-3);
    color: var(--i-fg-3);
    flex-shrink: 0;
    font-size: 14px;
    // &:after {
    //     border-color: rgba(#000, .2);
    //     left: 0em;
    //     right: 0
    // }
    &:last-child {
        border-bottom: 0;
        &:after {
            display: none;
        }
    }
    > .icon {
        @apply mr-2;
        width: 20px;
        height: 20px;
        &.duckduckgo {
            transform: scale(1.2);
        }
    }

    .label {
        @apply flex-grow;
    }

    &.used {
        background: var(--i-primary-7);
        color: #fff;
    }
}

</style>