angular.module('listaTelefonica').value('configValues', {       
        PageSize: 100,
        apiBaseUrl: 'https://mauroao-lista-telefonica-api.herokuapp.com/api',
        firestoreConfig: { 
                apiKey: 'AIzaSyDOvpRFiUUnTNlJr2Nh9L1K0eWWiBP8lTc',
                authDomain: 'projetofirestore.firebaseapp.com',
                databaseURL: 'https://projetofirestore.firebaseio.com',
                projectId: 'projetofirestore',
                storageBucket: 'projetofirestore.appspot.com',
                messagingSenderId: '322473565928'
        }
});

/* 
        url do servico interno do node js
        apiBaseUrl: 'http://localhost:3000/api' 
*/


/* 
        url do servico do node js na nuvem
        apiBaseUrl: 'https://mauroao-lista-telefonica-api.herokuapp.com/api' 
*/

angular.module('listaTelefonica').service('fireStoreService', function($location, $rootScope, configValues){

	$rootScope.api_version = configValues.firestoreConfig.databaseURL;

	var _db;

	try {
		$rootScope.loading = true;
		firebase.initializeApp(configValues.firestoreConfig);
		_db = firebase.firestore();
	}
	catch (e) {
		var msg = (e && e.message) ? e.message : '';
		$rootScope.loading = false;
		console.log('Erro ao conectar com firebase - ' + msg);	
		$location.path('/error');
	}

	$rootScope.loading = false;
	this.db = _db;
});
