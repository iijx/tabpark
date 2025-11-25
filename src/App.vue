<template>
	<div class="app" :style="style">
		<AppLayout :flowPageCount="1">
			<!-- <template #left-page>
				<Sentences />
			</template> -->
			<template #flow1>
				<router-view />
			</template>
			<!-- <template #main-menu>
				<LeftMenu />
			</template> -->
			<!-- <template #right-page>
				<ToDoIndex />
			</template> -->

		</AppLayout>

		<!-- 设置弹窗 -->
		<SettingDialog />

		<!-- 全局提示弹窗 -->
		<InfoDialog />

		<!-- 登录弹窗 -->
		<LoginDialog />

	</div>
</template>

<script setup lang="ts" name="App">
import AppLayout from '@/components/layout/index.vue';
import useAppInit from './compositions/use-app-init';
import LoginDialog from '@/components/login-dialog.vue';
import SettingDialog from '@/components/setting-dialog/index.vue';
import InfoDialog from '@/containers/info-dialog.vue';
import LeftMenu from '@/components/left-menu/index.vue';
import { ThemeColorKeys } from './compositions/use-app/theme-color-state';
import Sentences from '@/views/sentences/index.vue';
import MainMenu from '@/components/main-menu/index.vue';
import ToDoIndex from './modules/todo/index.vue';

const { appState } = useApp();

useAppInit();

const style = computed(() => {
	const url = appState.settingState.wrapperUrl || 'https://cdn.pastecuts.cn/wallpaper/1.jpg';
	if (url[0] === '#') {
		return {
			backgroundColor: url,
		}
	}

	return {
		backgroundImage: `url('${url}')`
	}
})

watch(() => appState.settingState, () => {
	document.documentElement.setAttribute('theme-color', appState.settingState.themeColor);
	document.documentElement.setAttribute('dark-mode', String(appState.settingState.darkMode));
}, { immediate: true, deep: true });

const updateThemeColor = () => {
	let rootStyle = getComputedStyle(document.documentElement);
	ThemeColorKeys.forEach((key: any) => {
		appState.themeColor[key] = rootStyle.getPropertyValue(key).trim();
	})
}
watch(() => appState.settingState.themeColor, updateThemeColor, { immediate: true });

</script>

<style lang="less" scoped>
@import "tailwindcss";
// @rightMenuWidth: 3.2rem;
.app {
	position: relative;
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
	// padding-right: @rightMenuWidth;
	background-size: cover;
	background-position: center;
	color: var(--i-fg-2);
	box-sizing: border-box;

	>.pages-container {
		width: 100%;
		height: 100%;
	}

	>.cover {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
	}

	.page {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;

		&.focus {
			background-color: rgba(0, 0, 0, .2);
		}
	}
}

.icon-setting-wrap {
	@apply absolute right-0 top-0 m-4 cursor-pointer;
}


.bottom-menu-wrap {
	position: absolute;
	bottom: 8px;
	// height: @rightMenuWidth;
	border-radius: 16px;
	background-color: rgba(0, 0, 0, .2);
	z-index: 1;
	backdrop-filter: blur(10px);
	left: 50%;
	transform: translate(-50%, 0);
	width: 100px;

	.item {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		&:hover {
			background-color: rgba(0, 0, 0, .2);
		}

		&.active {
			background-color: rgba(0, 0, 0, .3);
		}

		.icon {
			width: 20px;
			height: 20px;
		}
	}
}
</style>

<style lang="less">
html,
body,
#app,
.app {
	width: 100%;
	height: 100%;
}

body {
	position: relative;
}

.com-main-container {
	position: relative;
	max-width: 1350px;
	height: 100%;
	margin: 0 auto;
}

.line-bottom {
	position: relative;

	&:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		transform: scaleY(.5);
	}
}

.flex {
	display: flex;
}

.flex1 {
	flex: 1;
}
</style>