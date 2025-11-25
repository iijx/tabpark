import { isAbsoluteURL, getCustomRequest, cos, uuid, getExtName } from "./util";


interface IOpt {
    dir: string;
    defaultUploadList: string[],
}
interface IUploadItem {
    uid: string;
    status: string;
    percent: number;
    url: string;
}

export const useUpload = (option: IOpt) => {
    const uid = (() => {
        const now = +new Date();
        let index = 0;
        return () => `upload-${now}-${++index}`;
    })();
    let _list = (option.defaultUploadList || []).map(i => ({
        uid: uid(),
        url: isAbsoluteURL(i) ? i : `https://bing.pastecuts.cn/${i}`,
        status: 'success',
        percent: 100,
    }));

    const uploadList = ref<IUploadItem[]>(_list || []);

    const onProgress = (uid: string, _percent: number) => {
        const item = uploadList.value.find(i => i.uid === uid);
        if (item) {
            item.percent = _percent;
        }
    }

    const onDelete = (uid: string) => {
        const index = uploadList.value.findIndex(i => i.uid !== uid)
        uploadList.value.splice(index, 1);
        console.log('uploadList', uploadList)
    }
    const upload = (file: any) => {
        return customRequest(file).then(({ uid, data }) => {
            console.log('customRequest then data', data)
            const item = uploadList.value.find(i => i.uid === uid);
            if (item) {
                item.percent = 100;
                item.status = 'success';
            }
            return Promise.resolve(uploadList.value);
        }).catch(({ uid, err }) => {
            const item = uploadList.value.find(i => i.uid === uid);
            if (item) {
                item.percent = 100;
                item.status = 'false';
            }
            return Promise.resolve(uploadList);
        })
    }
    const customRequest = getCustomRequest(cos, {
        dir: option.dir,
    }, onProgress);

    const addFiles = (files: any[]) => {
        const promises = files.map(i => {
            i.uid = uid();
            i.cosKey = option.dir + '/' + uuid() + '.' + getExtName(i.name);
            uploadList.value.push({ 
                uid: i.uid,
                status: 'pending',
                percent: 0,
                url: `https://bing.pastecuts.cn/${i.cosKey}`
            });
            return i;
        }).map(file => {
            upload(file);
        });
        return Promise.all(promises);
    }

    return { uploadList, addFiles, onDelete }
}