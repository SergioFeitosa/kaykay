// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  login: false,
  ApiURL : 'http://localhost:8000',
  telefone: 0,
  codigo: 123,
  local: 'mesa001',
  modulo: '',
  fundoColoridoCardapio: true,
  fundoColoridoPedido: false,
  fundoColoridoCozinha: false,
  fundoColoridoBar: false,
  fundoColoridoEntrega: false,
  fundoColoridoConta: false,
  firebaseConfig: {
    apiKey: "AIzaSyAc9T6jV7QRc2sZMeQ3wAFxO2u-SH7dS_A",
    authDomain: "quiosque-phone.firebaseapp.com",
    projectId: "quiosque-phone",
    storageBucket: "quiosque-phone.appspot.com",
    messagingSenderId: "977420644755",
    appId: "1:977420644755:web:d49bb641a0a9ea7cef3866"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
