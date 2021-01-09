export interface IPhotoType {
    description: {
        _content: string
    },
    farm: number,
    id: string,
    secret: string,
    server: string,
    tags?: string,
    title: string,
    isfamily?: number,
    isfriend?: number,
    ispublic?: number,
    owner?: string,
}


export type SelectedTabType = 'recent' | 'search'
export type RequestPhotosType =  {
    type: SelectedTabType,
    page: number,
    text: string,
    maxDate: number
}
