import COS from 'cos-js-sdk-v5';

export const isAbsoluteURL = (url: string) => {
    return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
};

// export const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
export const uuid = () => '10004000'.replace(/[014]/g, (c: any) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)) + '-' + Date.now();

export const getExtName = (fileName: string) => {
    const index = fileName.lastIndexOf('.')
    if (index > -1) {
        return fileName.substring(index + 1)
    } else {
        return ''
    }
}


export const cos = new COS({
  SecretId: import.meta.env.VITE_COS_SECRET_ID,
  SecretKey: import.meta.env.VITE_COS_SECRET_KEY
})

interface IRes {
    uid: string;
    data: any;
}
export const getCustomRequest = (cos: COS, config: any, onProgress: any): (file: any) => Promise<IRes> => { 
    return (file: any) => {
        return new Promise((resolve, reject) => {
            const uid = file.uid;
            cos.putObject({
                Bucket: 'bing-1257702679',
                Region: 'ap-shanghai',
                Key: file.cosKey || (config.dir + '/' + uuid() + '.' + getExtName(file.name)),
                StorageClass: 'STANDARD',
                Body: file, // 上传文件对象
                onProgress: e => {
                    if (e.total > 0) {
                        e.percent *= 100;
                        onProgress(uid, (e.loaded / e.total) * 100)
                    }
                }
            }, (err, data) => {
                if (err) {
                    reject({ uid, err })
                } else {
                    resolve({ uid, data })
                }
            })
        })
    }
}
