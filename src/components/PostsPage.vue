<template>
    <v-container>
      <v-row >
        <v-col cols="12">
          <v-data-table
            :items="posts"
            :headers="postHeader"
            :loading="postLoading"
            :items-per-page="5"
            :search="search"
          >
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    
    <template v-if="!pUserId">
      <v-btn @click="goBack()">Kullanıcılar Sayfasına Dön</v-btn>
    </template>

    
  </template>



<script>
import axios from "axios";

export default {
  props:[
    "pUserId"
  ],
  data() {
    return {
      postHeader: [
        {
          title: "Post Id",
          value: "id",
          sortable: true,
        },
        {
          title: "Title",
          value: "title",
          sortable: true,
        },
        {
          title: "Body",
          value: "body",
          sortable: true,
        },
      ],
      posts: [],
      dialog: false,
      postLoading: true,
      isViewingPosts: false,
    };
  },
  mounted() {
   
  },
  methods: {
    fetchPosts(userId) {
      this.postLoading = true;
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.postLoading = false;
        });
    },

    goToPosts(userId) {
      this.$router.push(`/posts/${userId}`);
      this.fetchPosts(userId);
    },
    goBack() {
      this.$router.push("/users"); 
    },
  },
  watch:{

  },
  created()
  {
    if (this.$route.params.userId) {
      this.fetchPosts(this.$route.params.userId);
    }
    else{
      this.fetchPosts(this.pUserId);
    }
   }
};
</script>

