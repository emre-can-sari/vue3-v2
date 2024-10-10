<template>
  <div class="home-container">
    <h1>Anasayfaya Hoşgeldiniz</h1>
    <nav class="navigation">
      <router-link to="/login">Giriş Yap</router-link>
      <router-link to="/">Anasayfaya Git</router-link>
      <router-link to="/users">Kullanıcılar</router-link>
      <button class="logout-button" @click="handleLogout">Çıkış Yap</button>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      // Kullanıcı bilgilerini temizle
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("password"); // Eğer şifre de saklıyorsanız
      this.$router.push("/login"); // Giriş sayfasına yönlendir
    },
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 100px;
}

.navigation {
  margin-top: 20px;
}

.navigation a {
  margin: 0 15px;
  text-decoration: none;
  color: #163476; /* Bağlantı rengi */
  font-weight: bold; /* Kalın metin */
  padding: 8px 12px; /* İçerik için biraz boşluk */
  border-radius: 5px; /* Kenarları yuvarlat */
  transition: background-color 0.5s; /* Geçiş efekti */
}

.navigation a:hover {
  background-color: #73c5e5; /* Üzerine gelindiğinde arka plan rengi */
  color: #052748; /* Üzerine gelindiğinde metin rengi */
}

.logout-button {
    background-color: #ffffff;
    margin: 0 15px;
  text-decoration: none;
  color: #163476; /* Bağlantı rengi */
  font-size: 16px; /* Yazı boyutunu ayarlayın */
  font-weight: bold; /* Kalın metin */
  padding: 8px 12px; /* İçerik için biraz boşluk */
  border:none;
  border-radius: 5px; /* Kenarları yuvarlat */
  transition: background-color 0.5s; /* Geçiş efekti */
}

.logout-button:hover {
    background-color: #73c5e5; /* Üzerine gelindiğinde arka plan rengi */
    color: #052748; /* Üzerine gelindiğinde metin rengi */
}
</style>
