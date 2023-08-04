export function getPBImgPath(collectionName: string, item: any) {
    return `http://127.0.0.1:8090/api/files/${collectionName}/${item.id}/${item.img}`
}
