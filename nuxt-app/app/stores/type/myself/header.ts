// 定义按钮项的接口
interface BtnsType {
    ImgSrc: string;
    Link: string;
}

// 定义整个 Header 数据的接口（可选，但推荐）
export interface MyselfHeaderData {
    Btns: BtnsType[];
    AvatarSrc: string;
    Name: string;
    Desc: string;
}