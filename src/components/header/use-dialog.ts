import { DialogType, Pin } from '@/interface'

export const useDialog = () => {
    
    const tagDialog = reactive({
        show: false,
        type: DialogType.ADD, // 'ADD' | 'EDIT',
        item: new Pin({}),
        pinIndex: -1,
    })

    const showDialog = (type: DialogType, item?: Pin) => {
        tagDialog.show = true;
        tagDialog.type = type;
        if (type === DialogType.ADD) {
            tagDialog.item = new Pin({});
        } else if (type === DialogType.EDIT) {
            tagDialog.item = Pin.build(item as Pin);
        }
    }

    // 完成
    const complete = ({ name = '', color = '' }) => {
        if (tagDialog.type === DialogType.ADD) {
            const pin = new Pin({name, color});
        } else {
        }
        tagDialog.show = false;
    }

    return { tagDialog, complete, showDialog };
}