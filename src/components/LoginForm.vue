<template>
  <div class="login-container">
    <h2>Giriş Yap</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Email adresinizi giriniz"
        />
      </div>
      <div class="form-group">
        <label for="password">Şifre</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Şifrenizi giriniz"
        />
      </div>
      <button type="submit">Giriş Yap</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'; // useRouter'ı içe aktar

export default {
  data() {
  return {
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    errorMessage: '',
  };
},
  setup() {
    const router = useRouter(); // router'ı kullanmak için setup fonksiyonunu kullan
    return { router };
  },
  methods: {
  handleLogin() {
    // Basit bir doğrulama örneği (gerçek uygulamalarda API'ye istek yapılır)
    if (this.email === 'test@example.com' && this.password === '123456') {
      alert('Giriş başarılı!');
      localStorage.setItem('isLoggedIn', 'true'); // Giriş durumunu kaydet
      localStorage.setItem('email', this.email); // E-posta adresini kaydet
      localStorage.setItem('password', this.password); // E-posta adresini kaydet
      this.router.push('/'); // Yönlendirme
    } else {
      this.errorMessage = 'Geçersiz email veya şifre!';
    }
  },
},
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #358a6e;
}

.error {
  color: red;
  text-align: center;
}
</style>