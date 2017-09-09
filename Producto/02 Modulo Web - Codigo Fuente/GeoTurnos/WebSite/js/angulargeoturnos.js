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
            case 'datosEmpresa':
                $scope.contenidoATraer = 'GestionarDatosEmpresa';
                break;
            case 'gestionAgenda':
                $scope.contenidoATraer = 'GestionarAgendaTurnos';
                break;

        }


    };
})
app.controller("MiCuentaClientePrestatarioController", function () {

    $scope.contenidoATraer = 'PrincipalClientePrestatario';

    $scope.clickMenu = function (idLista) {
        $('li').removeClass('active');

        $('#' + idLista).attr("class", "active");

        $scope.cargarContenidoHtml(idLista);
    }

    $scope.cargarContenidoHtml = function (contenido) {
        switch (contenido) {
            case 'principal':
                $scope.contenidoATraer = 'PrincipalClientePrestatario';
                break;
            case 'gestiondatos':
                $scope.contenidoATraer = 'GestionarDatosCliente';
                break;


        }


    };
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
        
        httpNegativo(response.status);

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
                    if ($scope.empresas[i].idEmpresa == emp.idEmpresa) {
                        $scope.empresas.splice(i, 1);
                    }
                }
                
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'success', 'Empresa activada correctamente');

            }

        }, function (response) {
            
            httpNegativo(response.status);

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

            if ($scope.direccion.latitud != null) {

                window.marker = new google.maps.Marker({
                    position: { lat: $scope.direccion.latitud, lng: $scope.direccion.longitud },
                    map: window.map,
                    draggable: true,
                    icon: { url: 'http://localhost:6907/../resources/marker.png' }
                });

                window.map.setCenter({ lat: $scope.direccion.latitud, lng: $scope.direccion.longitud });

                window.marker.addListener('drag', handleEvent)

                $('#latitud').val($scope.direccion.latitud);
                $('#longitud').val($scope.direccion.longitud);
            }
            else {

                window.marker = new google.maps.Marker({
                    position: window.posicionActual,
                    map: window.map,
                    draggable: true,
                    icon: { url: 'http://localhost:6907/../resources/marker.png' }
                });

                window.marker.addListener('drag', handleEvent)

                window.map.setCenter(window.posicionActual);

                $('#latitud').val(window.posicionActual.lat);
                $('#longitud').val(window.posicionActual.lng);
            }

        }


    }, function (response) {
        
        httpNegativo(response.status);

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
                
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'success', 'Geoposición Actualizada');

            }

        }, function (response) {

            httpNegativo(response.status);

        }).then(function () {

        });
    }



    $scope.updateGeoposicionDesdeDireccion = function () {

        var dirABuscar = $scope.calle.split(' ');
        var query = '';

        for (i = 0; i < dirABuscar.length; i++) {

            query = query + dirABuscar[i] + '+';

        }

        if (query != '') {
            var consulta = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyDNnhH_2YL10wxOEhbDodNQvl20H8FD1Ns';
        }

        $http({
            method: 'GET',
            url: consulta,
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.data.status === 'OK') {
                //TODO: con for recorrer el vector que debuelve la peticion y ver que pertenezcan a la misma provincia
                var posicion = { lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng }
                window.map.setCenter(posicion);
                window.marker.setPosition(posicion);
                $('#latitud').val(posicion.lat);
                $('#longitud').val(posicion.lng);
            }
            if (response.data.status === 'ZERO_RESULTS') {
                
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'info', 'No hubo resultados');
            }
            if (response.data.status === 'REQUEST_DENIED') {
                
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'error', 'Petición rechazada');
            }
            if (response.data.status === 'INVALID_REQUEST') {
                
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'warning', 'Petición invalida');
            }
            if (response.data.status === 'UNKNOWN_ERROR') {
                alert('');
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'error', 'Error no identificado');
            }


        }, function (response) {
            
            httpNegativo(response.status);

        }).then(function () {

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
        
        httpNegativoSinContenedor(response.status);

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
        
        httpNegativoSinContenedor(response.status);

    }).then(function () {

    });

    $scope.clickProvincias = function () {
        this.isBusy = true;
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/ciudad?id=' + $scope.provinciaSel,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.ciudades);
            }
            this.isBusy = false;

        }, function (response) {
            
            httpNegativoSinContenedor(response.status);

        }).then(function () {

        });

        $("#ciudades").removeAttr('disabled');

    }
    $scope.clickCiudades = function () {

        this.isBusy = true;
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/barrio?id=' + $scope.ciudadSel,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.barrios);
            }
            this.isBusy = false;

        }, function (response) {
            
            httpNegativoSinContenedor(response.status);

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
        
        httpNegativoSinContenedor(response.status);

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
        
    }, function (response) {

        httpNegativoSinContenedor(response.status);

    }).then(function () {

    });

    $scope.clickProvincias = function () {
        
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/ciudad?id=' + $scope.provinciaSel,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.ciudades);
            }
            

        }, function (response) {
            
            httpNegativoSinContenedor(response.status);

        }).then(function () {

        });

        $("#ciudades").removeAttr('disabled');

    }
    $scope.clickCiudades = function () {

        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/barrio?id=' + $scope.ciudadSel,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.barrios);
            }
            
        }, function (response) {
            
            httpNegativoSinContenedor(response.status);

        }).then(function () {

        });

        $("#barrios").removeAttr('disabled');
    }

    $("#fechaNacimiento").jqxDateTimeInput({ theme: 'bootstrap', template: "primary", width: '275px', height: '25px' });

})
app.controller("BuscarTurnosController", function ($scope) {

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

    $scope.rubros = [];
    $scope.provincias = [];
    $scope.ciudades = [];
    $scope.marcadores = [];
    $scope.empresas = [];

    $("#loader").jqxLoader({ width: 100, height: 60, imagePosition: 'bottom', theme: 'bootstrap', text: 'Cargando...', textPosition: 'top', isModal: true });

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

        httpNegativo(response.status);

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

        httpNegativo(response.status);

    }).then(function () {

    });

    $scope.clickProvincias = function () {
        this.isBusy = true;
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/ciudad?id=' + $scope.prov,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.ciudades);
            }
            this.isBusy = false;

        }, function (response) {

            httpNegativo(response.status);

        }).then(function () {

        });

        $("#ciudades").removeAttr('disabled');

    }
    $scope.filtrarEmpresas = function () {

        $('#loader').jqxLoader('open');

        $scope.limpiarMarcadores();

        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/Empresa?nombre=&rubro=' + $scope.rubro + '&prov=' + $scope.prov + '&ciudad=' + $scope.ciudad,
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.empresas);

                if ($scope.empresas.length > 0) {
                    $scope.empresas.forEach($scope.cargarMarcadores);
                } else {

                }
            }
            if ($scope.marcadores.length === 0) {

                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'info', 'Búsqueda sin resultados');

            }

        }, function (response) {

            httpNegativo(response.status);

        }).then(function () {

            $('#loader').jqxLoader('close');

        });
    }
    $scope.cargarMarcadores = function (item, index) {


        if (item.Domicilio.latitud != null) {
            var posicion = { lat: item.Domicilio.latitud, lng: item.Domicilio.longitud }

            window.marker = new google.maps.Marker({
                position: posicion,
                map: map,
                icon: { url: 'http://localhost:6907/../resources/marker.png' }
                //ToDo: hacer los iconos por cada rubro
            });

            $scope.marcadores.push(window.marker);
        }
    }
    $scope.limpiarMarcadores = function () {
        for (var i = 0; i < $scope.marcadores.length; i++) {
            $scope.marcadores[i].setMap(null);

        }
        $scope.marcadores = [];
        $scope.empresas = [];
    }


})
app.controller("BuscarTurnoFiltradoController", function ($scope, $http) {

    $scope.rubros = [];
    $scope.provincias = [];
    $scope.ciudades = [];
    $scope.optionSelected = true;

    $("#loader").jqxLoader({ width: 100, height: 60, imagePosition: 'bottom', theme: 'bootstrap', text: 'Cargando...', textPosition: 'top', isModal: true });

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

        httpNegativo(response.status);

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

        httpNegativo(response.status);

    }).then(function () {

    });

    $scope.clickProvincias = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/ciudad?id=' + $scope.prov,
            headers: {
                'Accept': "application/json"
            }

        }).then(function (response) {
            if (response.status === 200) {
                angular.copy(response.data, $scope.ciudades);
            }
            this.isBusy = false;

        }, function (response) {

            httpNegativo(response.status);

        }).then(function () {

        });

        $("#ciudades").removeAttr('disabled');

    }
    $scope.filtrarEmpresas = function () {
        $('#loader').jqxLoader('open');

        $scope.empresas = [];

        var nombreEmp = '';

        if ($scope.nombre != undefined) {
            nombreEmp = $scope.nombre;
        }


        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/Empresa?nombre=' + nombreEmp + '&rubro=' + $scope.rubro + '&prov=' + $scope.prov + '&ciudad=' + $scope.ciudad,
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.length > 0) {

                    angular.copy(response.data, $scope.empresas);

                }
                else {

                    notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'info', 'Búsqueda sin resultados');
                }
            }


        }, function (response) {

            httpNegativo(response.status);

        }).then(function () {
            $('#loader').jqxLoader('close');
        });
    }
})

var notificar = function (notificacion, contenedorMensaje, contenedor, template, mensaje) {
    notificacion.jqxNotification({
        width: 300, position: "bottom-left", opacity: 0.9, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000,
        template: template, appendContainer: contenedor, showCloseButton: false
    });
    contenedorMensaje.html(mensaje);
    notificacion.jqxNotification("open");
}
var httpNegativo = function (status) {

    switch (status) {
        case 400:
            notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'warning', 'Solicitud errónea');
            break;
        case 401:
            notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'warning', 'No está autorizado para hacer esta petición');
            break;
        case 404:
            notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'warning', 'No se encontro el recurso solicitado');
            break;
        case 500:
            notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'error', 'Error interno del servidor');
            break;
        default:
            notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'error', 'Error no identificado');

    }

}
var notificarSinContenedor = function (notificacion, contenedorMensaje, offset, template, mensaje) {
    notificacion.jqxNotification({
        width: 300, position: "bottom-left", opacity: 0.9, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000,
        template: template, showCloseButton: false, browserBoundsOffset: offset
    });
    contenedorMensaje.html(mensaje);
    notificacion.jqxNotification("open");
}
var httpNegativoSinContenedor = function (status) {
    var offset = 50;
    switch (status) {
        case 400:
            notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), offset, 'warning', 'Solicitud errónea');
            break;
        case 401:
            notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), offset, 'warning', 'No está autorizado para hacer esta petición');
            break;
        case 404:
            notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), offset, 'warning', 'No se encontro el recurso solicitado');
            break;
        case 500:
            notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), offset, 'error', 'Error interno del servidor');
            break;
        default:
            notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), offset, 'error', 'Error no identificado');

    }

}