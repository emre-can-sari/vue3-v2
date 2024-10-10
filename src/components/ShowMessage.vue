<template>
    <v-card>
        <v-card-title class="d-flex justify-space-between">
            <div>
                {{title}}
            </div> 
            <div>
                <v-icon>
                    mdi-information
                </v-icon>                
            </div>           
        </v-card-title>
        <v-card-title class="pa-5">
            <slot>

            </slot>
        </v-card-title>

        <v-card-actions>
            <slot name="goBack">

            </slot>
            <slot name="actions">

            </slot>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
   name: 'showMessage',
   components: {
     
   },
   mixins: [],
   props: {
     message:String,
     title:{
        type:String,
        default:"Başlık"
     },
     value:Boolean,
   },
   data() {
     return {
       showDialog:true
     }
   },
   computed: {
     
   },
   watch: {

   },
   mounted() {
     
   },
   methods: {
     
   }
};
</script>
<style lang='' scoped>
</style>