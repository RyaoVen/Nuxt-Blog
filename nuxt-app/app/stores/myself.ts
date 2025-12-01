import  { defineStore } from "pinia";
import type { Axios} from "axios";
interface IndexState {
    code: number
    massage: string
    date: dateType|null
    isLoading: boolean
}


interface dateType{

}
export const IndexStore = defineStore('myself', {

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
                const response = await axiosInstance.get('/api/myself');
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