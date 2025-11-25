<template>
	<div class="collection-container" :class="{ open: appState.isShowPinPage.value }" @click="handlePageClick">
		<!-- 主要视图： 左右有 margin 的那种 -->
		<main class="main-container">
			<!-- 顶部 header -->
			<HeaderVue :isOpen="appState.isShowPinPage.value" @open="headerTabClick" />

			<WebList v-if="appState.isShowPinPage.value" :isShowAddBtn="!dialogState.isShow.value" @add="handleAddBtn" @edit="handleEditBtn"/>
		</main>

		<!-- 添加弹窗 -->
		<AddOrUpdateDialog />
	</div>
</template>

<script setup lang="ts" name="Collection">
import AddOrUpdateDialog from './components/add-dialog/index.vue';
import { useDialog } from './components/add-dialog/use-dialog';
import HeaderVue from '@/components/header/index.vue';
import { DialogType } from '@/interface';
import WebList from './components/web-list/index.vue';

const { appState, appAction } = useApp();
// 弹窗
const dialogState = useDialog();

// 收到「新增」事件
const handleAddBtn = () => {
	if (appAction.loginCheck()) {
		dialogState.show(DialogType.ADD);
	}
}

// 收到「编辑」事件
const handleEditBtn = (webItemId: string) => {
	if (appAction.loginCheck()) {
		const webItem = appState.webSiteIdMap[webItemId];
		if (!webItem) return console.log('handleEditBtn => 没有找到这个网站');
	
		dialogState.show(DialogType.EDIT, webItem);
	}
}

const headerTabClick = () => {
	appState.isShowPinPage.value = !appState.isShowPinPage.value;
}

const handlePageClick = () => {
	if (appState.pinEditState.isEditing.value) {
		appState.pinEditState.isEditing.value = false;
		return;
	}
	if (appState.pinEditState.popInfo.show) {
		appState.pinEditState.popInfo.show = false;
		return;
	}
	appState.isShowPinPage.value = false;
}

</script>

<style lang="less" scoped>
@import "./var.less";
.collection-container {
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 20;
	box-sizing: border-box;
	background-color: transparent;
	user-select: none;
	transition: all 300ms;
	pointer-events: none;

	&.open {
		pointer-events: all;
		height: 100vh;
		backdrop-filter: blur(20px);
		// background-color: rgba(0, 0, 0, 0.45);
		background-color: color-mix(in srgb, var(--i-primary-5) 15%, black 60%);
		// background-color: rgba(17, 24, 39, .8);
	}
}

.main-container {
	position: relative;
	height: 100%;
	margin: 0 auto;
	padding-top: calc(var(--t-header-top) + var(--t-header-height));
}

// 屏幕尺寸 1024px 以上 // 1040 即两边也至少留 32px
@media screen and (min-width: 1040px) {
	.main-container {
		width: @item-width * 4 + @item-gap-w * 4; // 976px;
	}
}

// 屏幕尺寸 756px 以上
@media screen and (min-width: 756px) and (max-width: 1039px) {
	.main-container {
		width: @item-width * 3 + @item-gap-w * 3; // 724px
	}
}
// 屏幕尺寸 756px 以上
@media screen and (min-width: 536px) and (max-width: 755px) {
	.main-container {
		width: @item-width * 2 + @item-gap-w * 2; // 472px
	}
}
// 屏幕尺寸 756px 以上
@media screen and (max-width: 535px) {
	.main-container {
		width: @item-width + @item-gap-w;
	}
}
</style>
