import { DialogType, WebSite } from "@/interface";

const dialogState = {
    isShow: ref(false),
    type: ref(DialogType.ADD),
    loading: ref(false),
    item: reactive(new WebSite({})),
    show: (_type: DialogType, webSite?: WebSite) => {
        dialogState.isShow.value = true;
        dialogState.type.value = _type;

        if (_type === DialogType.ADD) {
            dialogState.item.init({});
        }

        if (_type === DialogType.EDIT && webSite) {
            dialogState.item.init(webSite);
        }
    },
    hide: () => {
        dialogState.isShow.value = false;
    }
}

export const useDialog = () => {
    return dialogState;
}
