﻿var app = angular.module('geoturnos', ['ngMaterial']);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .accentPalette('blue');

});
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


        if (item.e.Domicilio.latitud != null) {
            var posicion = { lat: item.e.Domicilio.latitud, lng: item.e.Domicilio.longitud }

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
   
    $scope.crearCalificacion = function () {
        // Create jqxRating
        $("#jqxRating").jqxRating({ width: 350, height: 35, theme: 'classic' });
        $("#jqxRating").on('change', function (event) {
            $("#rate").find('span').remove();
            $("#rate").append('<span>' + event.value + '</span');
        });

    }

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
app.controller("GestionarAgendaTurnosController", function ($scope, $http) {

    $scope.submenu = function (evt, nombreMenu) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(nombreMenu).style.display = "block";
        evt.currentTarget.className += " active";
    }





})
app.controller("GestionarPlantillaAgenda", function ($scope, $http) {

    $scope.duracionTurnosData = [15, 20, 30, 40, 60];

    $scope.idPlantilla = -1;
    $scope.chkFeriadosLaborables = false;

    $("#loader").jqxLoader({ width: 100, height: 60, imagePosition: 'bottom', theme: 'bootstrap', text: 'Cargando...', textPosition: 'top', isModal: true });

    $('.selectorRango').jqxRangeSelector({
        width: 750, height: 10, min: new Date(2014, 5, 1, 0, 0, 0), max: new Date(2014, 5, 1, 24, 0, 0), range: { from: new Date(2014, 5, 1, 8, 0, 0), to: new Date(2014, 5, 1, 17, 0, 0) },
        majorTicksInterval: { hours: 4 }, minorTicksInterval: { minutes: 30 }, labelsFormat: 'H:mm tt', markersFormat: 'H:mm tt', showMinorTicks: true, disabled: true
    });

    $scope.habilitarSelector = function (origen, datos) {

        $('#' + origen).jqxRangeSelector({ disabled: !datos });

    }

    $('#loader').jqxLoader('open');

    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/ParametroAgenda/' + retornarid(),
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {

            $scope.idPlantilla = response.data.id_param_agenda;

            $('#duracionTurno').val(response.data.duracion_turno);

            $scope.chkFeriadosLaborables = response.data.atiende_feriado;

            $http({
                method: 'GET',
                url: 'http://localhost:6901/api/DiaXParametroAgenda/' + response.data.id_param_agenda,
                headers: {
                    'Accept': "application/json",

                }
            }).then(function (response) {
                if (response.status === 200) {

                    for (i = 0; i < response.data.length; i++) {

                        var checkbox = $("md-checkbox[id_dia*='" + response.data[i].id_dia + "']");

                        $scope[checkbox[0].attributes['ng-model'].nodeValue] = true;

                        var rangoselector = $('#horario' + checkbox[0].innerText);

                        var from = response.data[i].hora_inicio.split(':');
                        var to = response.data[i].hora_fin.split(':');

                        rangoselector.jqxRangeSelector({ disabled: false }).jqxRangeSelector('setRange', new Date(2014, 5, 1, Number(from[0]), Number(from[1]), 0), new Date(2014, 5, 1, Number(to[0]), Number(to[1]), 0));

                    }

                    

                }

            }, function (response) {

                httpNegativo(response.status);

            }).then(function () {

            });

        }

    }, function (response) {

        switch (response.status) {
            case 400:
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'warning', 'Solicitud errónea');
                break;
            case 401:
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'warning', 'No está autorizado para hacer esta petición');
                break;
            case 404:
                
                break;
            case 500:
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'error', 'Error interno del servidor');
                break;
            default:
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'error', 'Error no identificado');

        }

    }).then(function () {
        $('#loader').jqxLoader('close');
    });

    $scope.guardarPlantilla = function () {

        $('#loader').jqxLoader('open');

        if ($scope.idPlantilla === -1) {

            var nuevaPlantilla = {};

            nuevaPlantilla.duracion_turno = $scope.duracionTurnoModel;
            nuevaPlantilla.id_empresa = retornarid();
            nuevaPlantilla.atiende_feriado = $scope.chkFeriadosLaborables;

            $http({
                method: 'POST',
                url: 'http://localhost:6901/api/ParametroAgenda/',
                data: nuevaPlantilla,
                headers: {
                    'Accept': "application/json",

                }
            }).then(function (response) {
                if (response.status === 201) {

                    var array = $('.diaschk');
                   
                    for (i = 0; i < array.length; i++) {

                        if ($scope[array[i].attributes['ng-model'].nodeValue]) {

                            var dia = {};
                            $scope.idPlantilla = response.data.id_param_agenda;
                            dia.id_param_agenda = response.data.id_param_agenda;
                            dia.id_dia = Number(array[i].attributes['id_dia'].value);

                            var rango = $('#horario' + array[i].innerText).jqxRangeSelector('getRange');

                            dia.hora_inicio = moment(rango.from.getTime()).format('HH:mm:ss');
                            dia.hora_fin = moment(rango.to.getTime()).format('HH:mm:ss');;

                            $http({
                                method: 'POST',
                                url: 'http://localhost:6901/api/DiaXParametroAgenda',
                                data: dia,
                                headers: {
                                    'Accept': "application/json",

                                }
                            }).then(function (response) { }, function (response) {

                                httpNegativo(response.status);

                            }).then(function () {

                            });

                        }

                    }

                }

            }, function (response) {

                httpNegativo(response.status);

            }).then(function () {
                $('#loader').jqxLoader('close');
                notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'success', 'Plantilla guardada con éxito');
            });

        }
        else {
            $('#loader').jqxLoader('close');
            notificar($("#notificaciones"), $("#mensajeNotificacion"), $("#contenedorNotificaciones"), 'success', 'Plantilla guardada con éxito');
            //TODO: Falta un update
        }

    }

})
app.controller("SchedulerController", function ($scope, $http) {


    var appointments = [];
    var appointment1 = {
        id: "id1",
        description: "George brings projector for presentations.",
        location: "",
        subject: "Quarterly Project Review Meeting",
        calendar: "Room 1",
        start: new Date(2017, 10, 23, 9, 0, 0),
        end: new Date(2017, 10, 23, 16, 0, 0)
    }
    var appointment2 = {
        id: "id2",
        description: "",
        location: "",
        subject: "IT Group Mtg.",
        calendar: "Room 2",
        start: new Date(2017, 10, 24, 10, 0, 0),
        end: new Date(2017, 10, 24, 15, 0, 0)
    }
    var appointment3 = {
        id: "id3",
        description: "",
        location: "",
        subject: "Course Social Media",
        calendar: "Room 3",
        start: new Date(2017, 10, 27, 11, 0, 0),
        end: new Date(2017, 10, 27, 13, 0, 0)
    }
    var appointment4 = {
        id: "id4",
        description: "",
        location: "",
        subject: "New Projects Planning",
        calendar: "Room 2",
        start: new Date(2017, 10, 23, 16, 0, 0),
        end: new Date(2017, 10, 23, 18, 0, 0)
    }
    var appointment5 = {
        id: "id5",
        description: "",
        location: "",
        subject: "Interview with James",
        calendar: "Room 1",
        start: new Date(2017, 10, 25, 15, 0, 0),
        end: new Date(2017, 10, 25, 17, 0, 0)
    }
    var appointment6 = {
        id: "id6",
        description: "",
        location: "",
        subject: "Interview with Nancy",
        calendar: "Room 4",
        start: new Date(2017, 10, 26, 14, 0, 0),
        end: new Date(2017, 10, 26, 16, 0, 0)
    }
    appointments.push(appointment1);
    appointments.push(appointment2);
    appointments.push(appointment3);
    appointments.push(appointment4);
    appointments.push(appointment5);
    appointments.push(appointment6);
    // prepare the data
    var source =
    {
        dataType: "array",
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'calendar', type: 'string' },
            { name: 'start', type: 'date' },
            { name: 'end', type: 'date' }
        ],
        id: 'id',
        localData: appointments
    };
    var adapter = new $.jqx.dataAdapter(source);
    $("#scheduler").jqxScheduler({
        date: new $.jqx.date(2017, 11, 23),
        width: 800,
        height: 600,
        source: adapter,
        view: 'weekView',
        showLegend: true,
        ready: function () {
            $("#scheduler").jqxScheduler('ensureAppointmentVisible', 'id1');
        },
        resources:
        {
            colorScheme: "scheme05",
            dataField: "calendar",
            source: new $.jqx.dataAdapter(source)
        },
        appointmentDataFields:
        {
            from: "start",
            to: "end",
            id: "id",
            description: "description",
            location: "location",
            subject: "subject",
            resourceId: "calendar"
        },
        views:
        [
            'dayView',
            'weekView',
            'monthView'
        ]
    });



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