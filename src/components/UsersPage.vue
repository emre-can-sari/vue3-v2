<template>
  <v-container>
    <v-label><h2>Hangi Başlığı Görmek istemiyorsanız seçin.</h2></v-label>
    <v-row>
      <v-col
        v-for="(header, headerIndex) in userFullHeaders"
        :key="headerIndex"
        cols="auto"
      >
        <v-checkbox
          v-model="exceptHeaders"
          :value="header.value"
          :label="header.title"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :items="users"
          :headers="userHadersComputed"
          :loading="userLoading"
          :items-per-page="8"
          :search="search"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td v-for="header in userHadersComputed" :key="header.value">
                <template v-if="header.value === 'actions'">
                  <v-btn @click="goToPosts(item.id)" color="primary"
                    >Postları Göster</v-btn
                  >
                </template>
                <template v-else>
                  {{ item[header.value] }}
                </template>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog max-width="1000" v-model="showPosts">
    <ShowMessage title="Kullanıcı Postları">
      <PostsPage :p-user-id="selectedUser"> </PostsPage>
      <template #actions>
        <v-btn @click="showPosts = false"> Kapat </v-btn>
      </template>
      <template  #goBack >
        <v-btn @click="goPostPage(selectedUser)">Postlar Sayfasında Görüntüle</v-btn>
      </template>
    </ShowMessage>
  </v-dialog>
</template>

<script>
import axios from "axios";
import ShowMessage from "./ShowMessage.vue";
import PostsPage from "./PostsPage.vue";

export default {
  components: {
    PostsPage,
    ShowMessage,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      counter: 0,
      userHeader: [
        {
          title: "User Id",
          value: "id",
          sortable: true,
        },
        {
          title: "User Name",
          value: "username",
          sortable: true,
        },
        {
          title: "Işlemler",
          value: "actions",
          sortable: true,
        },
      ],
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
      exceptHeaders: [],
      posts: [],
      dialog: false,
      userLoading: true,
      postLoading: true,
      showPosts: false,
    };
  },
  computed: {
    userFullHeaders() {
      let firstObject = this.users?.[0] || null;

      if (!firstObject) {
        return [];
      }

      let keys = Object.keys(firstObject).map((key) => {
        return {
          title: this.turkcelestir(key),
          value: key,
          sortable: true,
        };
      });

      return keys;
    },

    userHadersComputed() {
      let exceptHeaders = this.exceptHeaders;

      let firstObject = this.users?.[0] || null;

      if (!firstObject) {
        return [];
      }

      let keys = Object.keys(firstObject).map((key) => {
        if (exceptHeaders.includes(key)) {
          return false;
        }

        return {
          title: this.turkcelestir(key),
          value: key,
          sortable: true,
        };
      });

      return [
        ...keys,
        {
          title: "İşlemler",
          value: "actions",
          sortable: true,
        },
      ];
    },
  },
  mounted() {
    this.fetchUsers();
    if (this.$route.params.userId) {
      this.fetchPosts(this.$route.params.userId);
    }
  },
  methods: {
    turkcelestir(key) {
      switch (key) {
        case "username":
          return "Kullanıcı Adı";
        case "name":
          return "İsim";
        case "email":
          return "Email";
        case "phone":
          return "Telefon";
        case "website":
          return "İnternet Sitesi";
        case "company":
          return "Şirket";
        case "address":
          return "Adres";
        default:
          return key;
      }
    },
    fetchUsers() {
      this.userLoading = true;
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.userLoading = false;
        });
    },
    fetchPosts(userId) {
      this.postLoading = true;

      this.isViewingPosts = true;
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
      this.showPosts = true;
      this.selectedUser = userId;
      this.fetchPosts(userId);
    },
    goBack() {
      this.$router.push("/users"); // URL'yi kullanıcılar sayfasına geri yönlendir
    },
    goPostPage(userId) {
      this.$router.push("/posts/" + userId);
    },
  },
};
</script>

<style scoped></style>
