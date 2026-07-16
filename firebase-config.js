/* =========================================================================
   CONFIGURAÇÃO DO FIREBASE
   -------------------------------------------------------------------------
   Preencha os valores abaixo com as credenciais do SEU projeto Firebase.
   Onde encontrar: console.firebase.google.com > (seu projeto) >
   ⚙️ Configurações do projeto > Geral > "Seus apps" > SDK setup and config.
   Veja o passo a passo completo no README.md
   ========================================================================= */
const firebaseConfig = {
  apiKey: "AIzaSyD3ZRug18s1DcKqAV5DP8Re1xFQMIhlGW8",
  authDomain: "chopperian1.firebaseapp.com",
  projectId: "chopperian1",
  storageBucket: "chopperian1.firebasestorage.app",
  messagingSenderId: "593484892850",
  appId: "1:593484892850:web:6d7b9a93987b4b0e26d7ab"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* Habilita cache local: se a internet cair por um instante, o app
   continua funcionando e sincroniza assim que a conexão voltar. */
db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
