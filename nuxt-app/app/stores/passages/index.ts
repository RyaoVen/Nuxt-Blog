import { defineStore } from 'pinia'
import axios, {Axios} from "axios";

interface IndexState {
    code: number
    massage: string
    date: dateType|null
    isLoading: boolean
}

interface articlesType{
    id: number,
    title: string,
    summary: string,
    author: string,
    date: string,
    category: string,
    tags: string[],
    views: number,
    likes: number
}
interface hotArticlesType{
    id: number,
    title: string,
    views: number
}
interface tagsType{
    name: string,
    count: number,
    color: string
}
interface categoryType{
    name: string,
    count: number
}


interface dateType{
    articles: articlesType[],
    hotArticles: hotArticlesType[],
    tags: tagsType[],
    categories: categoryType[],
}
export const IndexStore = defineStore('passages_index',{
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
                const response = await axiosInstance.get('/api/passages/index');
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