
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    login: false,
    ApiURL : 'http://localhost:8000',
    telefone: 0,
    codigo: 123,
    local: 'GS001',
    modulo: '',
    fundoColoridoCardapio: true,
    fundoColoridoPedido: false,
    fundoColoridoCozinha: false,
    fundoColoridoBar: false,
    fundoColoridoEntrega: false,
    fundoColoridoConta: false,
    firebaseConfig: {
      apiKey: "AIzaSyB2h7G3YHQQKEWM0MKlmCdhLK0qjH_Bjuk",
      authDomain: "angular-quiosque.firebaseapp.com",
      projectId: "angular-quiosque",
      storageBucket: "angular-quiosque.firebasestorage.app",
      messagingSenderId: "172900752590",
      appId: "1:172900752590:web:94b4f4701dddccee88c49f"
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
  
