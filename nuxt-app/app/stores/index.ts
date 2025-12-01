import  { defineStore } from "pinia";
import type { Axios} from "axios";

interface IndexState {
    code: number
    massage: string
    date: dateType|null
    isLoading: boolean
}
interface friendLinks{
    avatar:string,
    siteName: string,
    ownerName: string,
    description: string,
    screenshot: string,
    url: string
}
interface articles{
    title: string,
    author: string,
    date: string,
    category: string,
    tags: string[],
    summary: string,
    coverImage: string
}
interface dateType{
    articles: articles[],
    friendLinks: friendLinks[],
    btns: btnsType[],
    tags: tagsType[],
    TextH1: string,
    TextSpan: string,
}
interface btnsType{
    src:string,
    link:string,
    id:number
}
interface tagsType{
    effect:string,
    text:string,
    type:string,
    id:number
}


export const IndexStore = defineStore('index', {

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
