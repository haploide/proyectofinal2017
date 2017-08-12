var app = angular.module('geoturnos', []);

app.controller("AdministacionController", function ($scope, $http) {

    $scope.upDateEstadoEmpresa = function (emp) {
        $http({
            method: 'PUT',
            url: 'http://localhost:6901/api/Empresa/' + emp.idEmpresa,
            data: $scope.empresa,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 201) {
                alert('Estado cambiado');

            }

        }, function (response) {
            switch (response.statusText) {
                case 400:
                    alert("Bad Request");
                    break;
                case 401:
                    alert("Unauthorized");
                    break;
                case 404:
                    alert("Not Found");
                    break;
                case 500:
                    alert("Internal Server Error");
                    break;
                default:
                    alert("Error no identificado");
            }
        }).then(function () {

        });
    }

    $scope.clickMenu = function (idLista) {
        $('li').removeClass('active');

        $('#' + idLista).attr("class", "active");
        
    }

})
app.controller("MiCuentaEmpresaPrestadoraController", function ($scope) {

    $scope.clickMenu = function (idLista) {
        $('li').removeClass('active');

        $('#' + idLista).attr("class", "active");

    }
})

app.controller("MiCuentaClientePrestatarioController", function () {

})
app.controller("registrarEmpresa", function ($scope, $http) {
    $scope.rubros = [];
    $scope.provincias = [];
    $scope.ciudades = [];
    $scope.barrios = [];

    this.isBusy = true;
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/rubro',
        headers: {
            'Accept': "application/json"
        }

    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.rubros);
        }

    }, function (response) {
        switch (response.statusText) {
            case 400:
                alert("Bad Request");
                break;
            case 401:
                alert("Unauthorized");
                break;
            case 404:
                alert("Not Found");
                break;
            case 500:
                alert("Internal Server Error");
                break;
            default:
                alert("Error no identificado");
        }
    }).then(function () {

    });
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/provincia',
        headers: {
            'Accept': "application/json"
        }

    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.provincias);
        }
        this.isBusy = false;

    }, function (response) {
        switch (response.statusText) {
            case 400:
                alert("Bad Request");
                break;
            case 401:
                alert("Unauthorized");
                break;
            case 404:
                alert("Not Found");
                break;
            case 500:
                alert("Internal Server Error");
                break;
            default:
                alert("Error no identificado");
        }
    }).then(function () {

    });

    $scope.clickProvincias = function (idProvincia) {
        this.isBusy = true;
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/ciudad?id=' + idProvincia,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.ciudades);
            }
            this.isBusy = false;

        }, function (response) {
            switch (response.statusText) {
                case 400:
                    alert("Bad Request");
                    break;
                case 401:
                    alert("Unauthorized");
                    break;
                case 404:
                    alert("Not Found");
                    break;
                case 500:
                    alert("Internal Server Error");
                    break;
                default:
                    alert("Error no identificado");
            }
        }).then(function () {

        });

        $("#ciudades").removeAttr('disabled');

    }
    $scope.clickCiudades = function (idCiudad) {

        this.isBusy = true;
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/barrio?id=' + idCiudad,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.barrios);
            }
            this.isBusy = false;

        }, function (response) {
            switch (response.statusText) {
                case 400:
                    alert("Bad Request");
                    break;
                case 401:
                    alert("Unauthorized");
                    break;
                case 404:
                    alert("Not Found");
                    break;
                case 500:
                    alert("Internal Server Error");
                    break;
                default:
                    alert("Error no identificado");
            }
        }).then(function () {

        });

        $("#barrios").removeAttr('disabled');
    }

    $("#inicioActividades").jqxDateTimeInput({ theme: 'bootstrap', template: "primary", width: '275px', height: '25px' });

})
app.controller("registrarUsuario", function ($scope, $http) {
    $scope.tipoDoc = [];
    $scope.provincias = [];
    $scope.ciudades = [];
    $scope.barrios = [];

    this.isBusy = true;
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/tipoDocumento',
        headers: {
            'Accept': "application/json"
        }

    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.tipoDoc);
        }

    }, function (response) {
        switch (response.statusText) {
            case 400:
                alert("Bad Request");
                break;
            case 401:
                alert("Unauthorized");
                break;
            case 404:
                alert("Not Found");
                break;
            case 500:
                alert("Internal Server Error");
                break;
            default:
                alert("Error no identificado");
        }
    }).then(function () {

    });
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/provincia',
        headers: {
            'Accept': "application/json"
        }

    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.provincias);
        }
        this.isBusy = false;

    }, function (response) {
        switch (response.statusText) {
            case 400:
                alert("Bad Request");
                break;
            case 401:
                alert("Unauthorized");
                break;
            case 404:
                alert("Not Found");
                break;
            case 500:
                alert("Internal Server Error");
                break;
            default:
                alert("Error no identificado");
        }
    }).then(function () {

    });

    $scope.clickProvincias = function (idProvincia) {
        this.isBusy = true;
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/ciudad?id=' + idProvincia,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.ciudades);
            }
            this.isBusy = false;

        }, function (response) {
            switch (response.statusText) {
                case 400:
                    alert("Bad Request");
                    break;
                case 401:
                    alert("Unauthorized");
                    break;
                case 404:
                    alert("Not Found");
                    break;
                case 500:
                    alert("Internal Server Error");
                    break;
                default:
                    alert("Error no identificado");
            }
        }).then(function () {

        });

        $("#ciudades").removeAttr('disabled');

    }
    $scope.clickCiudades = function (idCiudad) {

        this.isBusy = true;
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/barrio?id=' + idCiudad,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.barrios);
            }
            this.isBusy = false;

        }, function (response) {
            switch (response.statusText) {
                case 400:
                    alert("Bad Request");
                    break;
                case 401:
                    alert("Unauthorized");
                    break;
                case 404:
                    alert("Not Found");
                    break;
                case 500:
                    alert("Internal Server Error");
                    break;
                default:
                    alert("Error no identificado");
            }
        }).then(function () {

        });

        $("#barrios").removeAttr('disabled');
    }

    $("#fechaNacimiento").jqxDateTimeInput({ theme: 'bootstrap', template: "primary", width: '275px', height: '25px' });

})
