<template>
	<section class="header-container" :class="{ open: isOpen }" @click.stop oncontextmenu="return false">
		<TransitionGroup tag="div" name="fade" class="v-menu">
			<div
				v-for="(item, index) of pinList"
				:key="item.id"
				:data-id="item.id"
				class="pin-item"
				:class="{
					active: item.id === curPinId && isOpen,
				}"
				@mousedown="handlePinClick(item.id || '')"
				@click.stop
				@contextmenu="e => handlePinRightClick(e, index)"
			>
				{{ item.name }}
			</div>
		</TransitionGroup>

		<!-- 左侧：全部 -->
		<!-- <section
			v-show="isOpen"
			class="all-item"
			:class="{ active: curPinId.value === ALL_PIN_ID }"
			@click.stop="handlePinClick(ALL_PIN_ID)">
			<icon-application-menu theme="outline" size="18" fill="currentcolor" />
			<span class="ml-2">全部</span>
		</section> -->

		<!-- 右侧：添加图标 -->
		<section v-show="isOpen && pinList.length < 11" class="add-item" @click.stop="handleAddPinBtn">
			<!-- 如果正在添加：显示箭头图标 -->
			<!-- <Motion v-if="state.isAdding.value" class="flex w-16">
				<icon-close theme="outline" size="16" fill="currentcolor" />
				<icon-arrow-left theme="outline" size="18" fill="currentcolor" />
			</Motion> -->
			<!-- 否则：显示编辑图标 -->
			<!-- <Motion v-else> -->
				<!-- <icon-write lktheme="outline" size="16" fill="currentcolor" /> -->
				<icon-plus theme="outline" size="18" fill="currentcolor" />
			<!-- </Motion> -->
		</section>

		<!-- 添加的 input 框 -->
		<!-- <Presence>
			<Motion
				v-if="state.isAdding.value"
				:initial="{ opacity: 0, scaleX: 0 }" :animate="{ opacity: 1, scaleX: 1 }"
				:exit="{ opacity: 0, scaleX: 0 }" class="absolute right-12 origin-right" @click.stop>
				<input id="AddPinInputId" v-model="state.addInput.value" type="text" @blur="handleCancelAddPin"
					placeholder="添加新类别，起个名吧"
					class="bg-black bg-opacity-20 input border border-green-50 w-full input-sm outline-none" />
			</Motion>
		</Presence> -->

		<!-- 右键：编辑的 popup  -->
		<ul v-if="popInfo.show" class="edit-pop" v-clickout="handlePopupClickout" :style="popInfo.style">
			<li class="item" @click="handleEditPin"><a href="javascript:;">编辑</a></li>
			<li class="item" @click="handleDeletePin"><a href="javascript:;">删除</a></li>
		</ul>

		<!-- 编辑弹框 -->
		<Dialog :value="editState.isEditing" width="330px" :title="editState.title" theme="dark" @confirm="handleEditConfirm" @cancel="editState.isEditing = false">
			<section class="w-full pb-12 pt-4">
				<I-Input v-model.trim="editState.input" size="bigger" placeholder="请输入名称"/>
			</section>
		</Dialog>

	</section>
</template>

<script setup lang="ts" name="Nav">
import Dialog from '@/components/dialog/index.vue';
import IInput from '@/components/input/index.vue';
import useEditPin from './use-edit-pin';
import { useDragItem } from "./use-drag-pin";

const props = defineProps({
	isOpen: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'open'])

const { appState, appAction } = useApp();
const { pinList, curPinId } = appState;
const handlePinClick = (pinId: string) => {
	if (!props.isOpen) {
		emit('open');
	}
	// 如果点击的是当前的 pin，不做任何操作
	if (appState.curPinId.value === pinId) return;
		else {
			appAction.setCurPinId(pinId);
		}
}

// 编辑相关
const {
	editState,
	popInfo,
	handleEditPin,
	handleDeletePin,
	handleAddPinBtn,
	handlePinRightClick,
	handlePopupClickout,
	handleEditConfirm
} = useEditPin();

// 拖拽相关
useDragItem({
	targetClass: 'v-menu',
	itemClass: 'pin-item',
	isDisabled: computed(() => !props.isOpen),
})

</script>

<style lang="less" scoped>
@import "tailwindcss";

@paddingLR: 15px;

.header-container {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	pointer-events: all;
	z-index: 10;
	padding: 4px @paddingLR 0;
	height: var(--t-header-height);
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 300ms;
	color: rgba(#fff, .6);
	cursor: pointer;
	&:after {
		content: '';
		position: absolute;
		left: @paddingLR;
		right: @paddingLR;
		bottom: 0;
		height: 1px;
		background: rgba(#fff, 0);
		transform: scaleY(0.5);
	}

	&:hover:not(.open):after {
		background-color: rgba(#fff, .05);
	}

	&.open {
		transform: translateY(var(--t-header-top));
		&:after {
			background-color: rgba(#fff, .3);
		}
	}
}

._menu-item {
	font-size: 14px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-radius: 6px;
	color: rgba(#fff, .75);
	// letter-spacing: 1px;
	text-shadow: 0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%);
	width: 5em;
	padding: 0 0.8em;
	box-sizing: border-box;
	cursor: pointer;
	height: var(--t-header-pin-height);
	line-height: var(--t-header-pin-height);
	text-align: center;
	transition: all 100ms ease;
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

	&:hover {
		color: rgba(#fff, .85);
		background-color: rgba(#000, .1);
	}

	&:active {
		color: #fff;
		background-color: rgba(#000, .2);
		font-weight: bolder;
	}

	&.active {
		color: rgba(#fff, .85);
		background-color: rgba(#000, .6);
		font-weight: bolder;
	}
}

.v-menu {
	height: var(--t-header-pin-height);
	display: flex;
}
.pin-item {
	._menu-item;
	margin-right: 12px;
	&.dragging {
		opacity: 0;
	}
}


.all-item {
	._menu-item;
	@apply w-20;
	position: absolute;
	left: @paddingLR;
}
.add-item {
	._menu-item;
	position: absolute;
	width: 32px;
	right: @paddingLR;
	display: flex;
	align-items: center;
	justify-content: center;

}


.edit-input {
	@apply bg-transparent text-center w-full outline-none;
	border: none;
	border-bottom: 1px dashed #999;
	border-radius: 0;
	outline: none;
	padding-bottom: 2px;
	box-sizing: border-box;

	&:focus {
		outline: none;
	}
}

.edit-pop {
	@apply absolute w-40 z-50 p-2 border-slate-900 shadow-md rounded border;
	// backdrop-filter: blur(20px);
	// background: rgba(17, 18, 20);
	// color: rgb(181, 186, 193);
	background: var(--i-bg-1);
	color: var(--i-fg-1);
	font-weight: bold;
	font-size: 13px;

	.item {
		@apply px-2 py-1 rounded hover:bg-primary hover:text-white;
		margin: 4px 0;
		&:hover {
			background-color: rgba(60, 69, 165);
			// background-color: rgba(71, 82, 196);
			background: var(--i-primary);
			color: var(--i-primary-content);
			// color: var(--i-fg-3-hover);
			// color: #fff;
		}
	}
}
</style>