<template>
  <InfoDialog
    :value="infoDialog.show"
    :title="infoDialog.title"
    :type="infoDialog.type"
    :content="infoDialog.content"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<script setup name="InfoDialogContainer" lang="ts">
import InfoDialog from '@/components/dialog/info-dialog.vue';

const { appState } = useApp();
const { infoDialog } = appState;

const handleConfirm = () => {
    infoDialog.show = false;
    infoDialog.promiseResolve && infoDialog.promiseResolve();
}

const handleCancel = () => {
    infoDialog.show = false;
    infoDialog.promiseReject && infoDialog.promiseReject();
}

</script>