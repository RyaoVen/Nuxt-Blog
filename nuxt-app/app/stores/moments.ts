import  { defineStore } from "pinia";
import type { Axios} from "axios";
import type { Ref} from "vue";
import { ref } from "vue";

interface IndexState {
    code: number
    massage: string
    date: dateType|null
    isLoading: boolean
    commentTo: number|null
    replayTo: number|null
}
interface authorType{
    name:string,
    avatar:string,
}
interface momentsType{
    id:number
    author: authorType,
    content: string,
    images: string[],
    date: string,
    likes: number,
    comments: number,
    type:string
}

interface dateType{
    moments:momentsType
}



const MomentsStore = defineStore('moments', {

    state: (): IndexState => ({
        code: 400,
        massage: '',
        date: null,
        isLoading: false,
        commentTo: null,
        replayTo:null,
    }),

    getters:{
        getLoading:(state)=>state.isLoading,
    },

    actions: {
        async fetchIndexData(axiosInstance: Axios) {
            this.isLoading = true;
            try {
                const response = await axiosInstance.get('/api/moments');
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

export default MomentsStore;