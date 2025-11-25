<template>
    <section>
        <main class="i-block">
            <section class="item">
                <div class="label">暗黑模式</div>
                <ISwitch v-model="appState.settingState.darkMode" />
                <!-- <input type="checkbox" class="toggle" checked /> -->
            </section>
            <!-- <section class="item">
                <div class="label">跟随系统</div>
                <ISwitch />
            </section> -->
        </main>
    
        <main class="i-block mt-4">
            <section class="item">
                <div class="label">主题色</div>
                <input type="radio" v-model="appState.settingState.themeColor" value="sky" name="radio-0" theme-color="sky" class="radio i-primary ml-2" />
                <input type="radio" v-model="appState.settingState.themeColor" value="valentine" name="radio-0" theme-color="valentine" class="radio i-primary ml-2" />
            </section>
        </main>
    </section>
</template>

<script lang="ts" setup name="ThemeConfigItem">
const { appState } = useApp();
</script>

<style lang="less" scoped>
@import "tailwindcss";

.i-block {
    // @apply bg-white bg-opacity-5;
    @apply p-2 rounded-md;
    --bgColor: color-mix(in srgb, var(--i-primary-2) 90%, transparent);
    // --bgColor: var(--i-primary-2);
    background-color: var(--bgColor);
}
.item {
    @apply flex items-center;
    font-size: 14px;
    .label {
        @apply flex-grow;
    }
}
.toggle {
    background-color: var(--i-primary-6);
    box-shadow: 
        var(--handleoffsetcalculator) 0 0 2px var(--bgColor) inset,
        0 0 0 2px var(--bgColor) inset, 0 0;
    // box-shadow: var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset, var(--togglehandleborder);
}
.radio {
    &.i-primary {
        border-color: var(--i-primary-6);
        background-color: transparent;
        &:checked {
            background-color: var(--i-primary-6);
            box-shadow: 0 0 0 4px var(--bgColor) inset, 0 0 0 4px var(--i-primary-6) inset;
        }
    }
    &.i-primary {
        border-color: var(--i-primary-6);
        background-color: transparent;
        &:checked {
            background-color: var(--i-primary-6);
            box-shadow: 0 0 0 4px var(--bgColor) inset, 0 0 0 4px var(--i-primary-6) inset;
        }
    }
}

</style>