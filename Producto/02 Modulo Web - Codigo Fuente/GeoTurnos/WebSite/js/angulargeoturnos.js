var app = angular.module('geoturnos', []);

app.controller("AdministacionController", function ($scope, $http) {
    
    $scope.contenidoATraer = 'PrincipalAdministracion';
    
    $scope.clickMenu = function (idLista) {
        $('li').removeClass('active');

        $('#' + idLista).attr("class", "active");

        $scope.cargarContenidoHtml(idLista);
    }

    $scope.cargarContenidoHtml = function (contenido) {
        switch (contenido) {
            case 'principal':
                $scope.contenidoATraer = 'PrincipalAdministracion';
                break;
            case 'activacionEmpresa':
                $scope.contenidoATraer = 'ActivacionEmpresa';
                break;

        }


    };

})
app.controller("MiCuentaEmpresaPrestadoraController", function ($scope) {
    $scope.alcance = "MiCuentaEmpresaPrestadoraController";
    $scope.contenidoATraer = 'PrincipalEntidadPrestadora';

    $scope.clickMenu = function (idLista) {
        $('li').removeClass('active');

        $('#' + idLista).attr("class", "active");

        $scope.cargarContenidoHtml(idLista);
    }

    $scope.cargarContenidoHtml = function (contenido) {
        switch (contenido) {
            case 'principal':
                $scope.contenidoATraer = 'PrincipalEntidadPrestadora';
                break;
            case 'geoposicion':
                $scope.contenidoATraer = 'GestionarGeolocalizacion';
                break;

        }


    };
})
app.controller("MiCuentaClientePrestatarioController", function () {

})
app.controller("ActivarEmpresasController", function ($scope, $http) {

    $scope.empresas = [];
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/Empresa?idEst=2',
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.empresas);
        }


    }, function (response) {
        switch (response.status) {
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

    $scope.upDateEstadoEmpresa = function (emp) {
        // aca se cambia el estado de la empresa para activarla
        emp.idEstado = 1;
        emp.Estado.idEstado = 1;
        $http({

            method: 'PUT',
            url: 'http://localhost:6901/api/Empresa/' + emp.idEmpresa,
            data: emp,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {

                for (var i = 0; i < $scope.empresas.length ; i++) {
                    if( $scope.empresas[i].idEmpresa == emp.idEmpresa)
                    {
                        $scope.empresas.splice(i, 1);
                    }
                }
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

})
app.controller("GestionGeoposicionController", function ($scope, $http) {
    $scope.calle;
    $scope.direccion;
    
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/domicilio/' + $('#idEmpresa').val(),
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {
            $scope.direccion = response.data;

            $scope.calle = $scope.direccion.calle + ' ' + $scope.direccion.altura;
               
        }


    }, function (response) {
        switch (response.status) {
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

    $scope.updateGeoposicion = function () {
        $scope.direccion.latitud = Number($('#latitud').val());
        $scope.direccion.longitud = Number($('#longitud').val());
        
        $http({
            method: 'PUT',
            url: 'http://localhost:6901/api/domicilio/' + $scope.direccion.idDomicilio,
            data: $scope.direccion,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                alert('Geoposición Actualizada');

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

    

    $scope.updateGeoposicionDesdeDireccion = function () {

        var consulta='https://maps.googleapis.com/maps/api/geocode/json?address=malvina+2450&key=AIzaSyDWMuUF9ciUfQtVEJEU7OCSSTO3-4Hewc8';
        window.map.setCenter({ lat: -31.4240452, lng: -64.5083392 });

        marker = new google.maps.Marker({
            position: { lat: -31.4240452, lng: -64.5083392 },
            map: map,
            draggable: true,
            icon: {url:'http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/map-marker-icon.png'}
        });
    }
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
app.controller("BuscarTurnosController", function ($scope){

    $scope.contenidoATraer = 'PrincipalBusqueda';

    $scope.clickMenu = function (idLista) {
        $('li').removeClass('active');

        $('#' + idLista).attr("class", "active");

        $scope.cargarContenidoHtml(idLista);
    }

    $scope.cargarContenidoHtml = function (contenido) {
        switch (contenido) {
            case 'principal':
                $scope.contenidoATraer = 'PrincipalBusqueda';
                break;
            case 'geo':
                $scope.contenidoATraer = 'BuscarPorGeoposicion';
                break;
            case 'filtros':
                $scope.contenidoATraer = 'BuscarPorFiltrado';
                break;

        }


    };

})
app.controller("BuscarTurnoGeoController", function ($scope, $http) {

})
app.controller("BuscarTurnoFiltradoController", function ($scope, $http) {
    $scope.empresas = [];
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/Empresa?idEst=1',
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.empresas);
        }


    }, function (response) {
        switch (response.status) {
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
})
