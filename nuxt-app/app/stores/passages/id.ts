import  { defineStore } from "pinia";
import type { Axios} from "axios";

interface IndexState {
    code: number
    massage: string
    date: dateType|null
    isLoading: boolean
}
interface articleType{
    id: number,
    title: string,
    subtitle: string,
    author: {
        name: string,
        avatar: string,
        bio: string
    },
    date: string,
    updateDate: string,
    category: string,
    tags: string,
    views: number,
    readTime: string
}
type ContentItemType = 'heading' | 'paragraph' | 'code' | 'list';

interface ContentItem {
    type: ContentItemType;
}

// 每种类型的具体接口
interface HeadingItem extends ContentItem {
    type: 'heading';
    level: number; // 1,2,3,4 级标题
    text: string;
}

interface ParagraphItem extends ContentItem {
    type: 'paragraph';
    text: string;
}

interface CodeItem extends ContentItem {
    type: 'code';
    language: string; // 如 'javascript', 'html'
    code: string;
}

interface ListItem extends ContentItem {
    type: 'list';
    items: string[]; // 列表项数组
}

// 最终联合类型
type ContentSection = HeadingItem | ParagraphItem | CodeItem | ListItem;

interface relatedArticlesType{
    id: number,
    title: string,
    category: string
}
interface tocType{
    id:string,
    title:string,
    level:number
}
interface authorType {
    name: string,
    avatar: string
}
interface repliesType{
    id: number,
    author:authorType
    content: string,
    date: string,
    likes: number
}
interface commentsType{
    id:number,
    author:authorType,
    content:string,
    date:string,
    likes:number,
    replies:repliesType[]
}


interface dateType{
    article:articleType,
    contentSections:ContentSection[],
    relatedArticles:relatedArticlesType[],
    toc:tocType[],
    comments:commentsType[],
}

export const IndexStore = defineStore('passage_id', {

    state: (): IndexState => ({
        code: 400,
        massage: '',
        date: null,
        isLoading: false,

    }),

    getters:{
        getLoading:(state)=>state.isLoading,
    },

    actions: {
        async fetchIndexData(axiosInstance: Axios) {
            this.isLoading = true;
            try {
                const response = await axiosInstance.get('/api/index');
                this.code = response.data.code;
                this.massage = response.data.massage;
                this.date = response.data.data;
            } catch (error) {
                this.code = 500;
                this.massage = 'Failed to fetch data';
                this.date = null;
            } finally {
                this.isLoading = false;
            }
        }

    }

})