var app = angular.module('geoturnos', ['ngMaterial']);

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
            case 'gestionRubro':
                $scope.contenidoATraer = 'GestionRubro';
                break;
            case 'Estadisticas':
                $scope.contenidoATraer = 'Estadisticas';
                break;
        }

    };

})
app.controller("EstadisticaAdministacionController", function ($scope, $http) {

    $scope.contenidoATraer = '';



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
        //document.getElementById(nombreMenu).style.display = "block";
        evt.currentTarget.className += " active";
        switch (nombreMenu) {
            case 'estadistcia1':
                $scope.contenidoATraer = 'EstadisticaCantidadEmpresasXRubro';
                break;

        }
    }


})
app.controller("CantidadEmpresasPorRubroController", function ($scope, $http) {

    $scope.rubros = [];
    $scope.datos = [['Rubro', 'Cantidad']]
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/VistaCantidadEmpresasXRubro',
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.rubros);            
                
            for (var i = 0; i < $scope.rubros.length; i++) {
                $scope.datos.push([$scope.rubros[i].nombre, $scope.rubros[i].cantidad])

            }

            google.charts.load("current", { packages: ["corechart"] });
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var data = google.visualization.arrayToDataTable($scope.datos);

                var options = {
                    title: 'Empresas por Rubro',
                    legend: 'none',
                    pieSliceText: 'label',
                    is3D: true,

                };

                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                chart.draw(data, options);
            }

        }

    }, function (response) {

        httpNegativo(response.status);

    }).then(function () {

    });






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
app.controller("MiCuentaClientePrestatarioController", function ($scope) {

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
            case 'gestionarMisTurnos':
                $scope.contenidoATraer = 'GestionarMisTurnos';
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
app.controller("GestionRubroController", function ($scope, $http) {
    var esNuevo = true;
    var idRubroModificar = 0;
    var rubroModificar = "";
    $scope.rubro = [];
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/Rubro',
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.rubro);
        }

    }, function (response) {

        httpNegativo(response.status);

    }).then(function () {

    });

    $scope.guardarRubro = function () {
        if (esNuevo == true) {
            if (confirm("Desea crear el Rubro: " + $scope.nombreRubro)) {
                var nuevoRubro = {};
                nuevoRubro.nombre = $scope.nombreRubro;
                $http({
                    method: 'POST',
                    url: 'http://localhost:6901/api/Rubro',
                    data: nuevoRubro,
                    headers: {
                        'Accept': "application/json",

                    }
                }).then(function (response) {
                    if (response.status == 201) {
                        $scope.rubro.push(response.data);
                        $scope.nuevoRubro
                    }
                }, function (response) {

                    httpNegativo(response.status);

                }).then(function () {

                });

            }
            else {

            }
        }
        else {
            if (confirm("Desea Modificar el Rubro: " + rubroModificar + " por " + $scope.nombreRubro)) {
                var rubroModificado = {};
                var rubroAModificar = {};
                rubroAModificar.nombre = rubroModificar;
                rubroAModificar.idRubro = idRubroModificar;
                rubroModificado.nombre = $scope.nombreRubro;
                rubroModificado.idRubro = idRubroModificar;
                $http({
                    method: 'PUT',
                    url: 'http://localhost:6901/api/Rubro/' + rubroModificado.idRubro,
                    data: rubroModificado,
                    headers: {
                        'Accept': "application/json",

                    }
                }).then(function (response) {
                    if (response.status == 200) {
                        $scope.rubro.splice($scope.rubro.indexOf(rubroAModificar, [0]), 1, response.data);
                        $scope.nuevoRubro();
                    }
                }, function (response) {

                    httpNegativo(response.status);

                }).then(function () {

                });

            }
            else {

            }
        }



    }

    $scope.eliminarRubro = function (rub) {
        if (confirm("Esta seguro que desea eliminar el rubro: " + rub.nombre)) {
            var id = rub.idRubro;
            $http({
                method: 'DELETE',
                url: 'http://localhost:6901/api/Rubro/' + id,
                headers: {
                    'Accept': "application/json",

                }
            }).then(function (response) {
                if (response.status == 200) {
                    $scope.rubro.splice($scope.rubro.indexOf(rub, [0]), 1);
                    $scope.nuevoRubro();
                }
            }, function (response) {

                httpNegativo(response.status);

            }).then(function () {

            });
        }
        else {

        }

    }

    $scope.modificarRubro = function (rub) {
        var l1 = document.getElementById("GestionarRubro");
        l1.innerText = "Modificar Rubro";
        var l1 = document.getElementById("rubro");
        l1.value = rub.nombre;
        rubroModificar = rub.nombre;
        idRubroModificar = rub.idRubro;
        esNuevo = false;

    }
    $scope.nuevoRubro = function () {
        var l1 = document.getElementById("GestionarRubro");
        l1.innerText = "Nuevo Rubro";
        var l1 = document.getElementById("rubro");
        l1.value = "";
        esNuevo = true;
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
    $scope.empresas = [];
    $scope.optionSelected = true;
    $scope.verCalificacion = function () {



        for (var i = 0; i < $scope.empresas.length; i++) {
            if ($scope.empresas[i].e.comentario != null) {
                var estrella = $('#estrella' + $scope.empresas[i].e.idEmpresa);
                if (estrella.length > 0) {
                    estrella.jqxRating({
                        width: 100, height: 35, value: $scope.empresas[i].e.comentario, disabled: true, precision: 0.5
                    });
                }
            }
        }



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



        var nombreEmp = '';

        if ($scope.nombre != undefined) {
            nombreEmp = $scope.nombre;
        }


        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/VistaFiltroEmpresa?nombre=' + nombreEmp + '&rubro=' + $scope.rubro + '&prov=' + $scope.prov + '&ciudad=' + $scope.ciudad,
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

    $scope.contenidoATraer = '';

    $scope.submenu = function (idLista) {
        $('button').removeClass('active');

        $('#' + idLista).attr("class", "active");

        $scope.cargarContenidoHtml(idLista);

        switch (idLista) {
            case 'plantilla':
                $scope.contenidoATraer = 'GestionarPlantillaTurnos';
                break;
            case 'visualizarAgenda':
                $scope.contenidoATraer = 'VisualizarAgenda';
                break;
        }



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
app.controller("GestionarMisTurnosController", function ($scope, $http) {
    $scope.VistaTurnosAgendaVigenteParaClientes = [];
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/VistaTurnosAgendaCliente/' + retornarid(),
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.VistaTurnosAgendaVigenteParaClientes);
        }

    }, function (response) {

        httpNegativo(response.status);

    }).then(function () {

    });

    $scope.guardarRubro = function () {
        if (esNuevo == true) {
            if (confirm("Desea crear el Rubro: " + $scope.nombreRubro)) {
                var nuevoRubro = {};
                nuevoRubro.nombre = $scope.nombreRubro;
                $http({
                    method: 'POST',
                    url: 'http://localhost:6901/api/Rubro',
                    data: nuevoRubro,
                    headers: {
                        'Accept': "application/json",

                    }
                }).then(function (response) {
                    if (response.status == 201) {
                        $scope.rubro.push(response.data);
                        $scope.nuevoRubro
                    }
                }, function (response) {

                    httpNegativo(response.status);

                }).then(function () {

                });

            }
            else {

            }
        }
        else {
            if (confirm("Desea Modificar el Rubro: " + rubroModificar + " por " + $scope.nombreRubro)) {
                var rubroModificado = {};
                var rubroAModificar = {};
                rubroAModificar.nombre = rubroModificar;
                rubroAModificar.idRubro = idRubroModificar;
                rubroModificado.nombre = $scope.nombreRubro;
                rubroModificado.idRubro = idRubroModificar;
                $http({
                    method: 'PUT',
                    url: 'http://localhost:6901/api/Rubro/' + rubroModificado.idRubro,
                    data: rubroModificado,
                    headers: {
                        'Accept': "application/json",

                    }
                }).then(function (response) {
                    if (response.status == 200) {
                        $scope.rubro.splice($scope.rubro.indexOf(rubroAModificar, [0]), 1, response.data);
                        $scope.nuevoRubro();
                    }
                }, function (response) {

                    httpNegativo(response.status);

                }).then(function () {

                });

            }
            else {

            }
        }



    }

    $scope.eliminarRubro = function (rub) {
        if (confirm("Esta seguro que desea eliminar el rubro: " + rub.nombre)) {
            var id = rub.idRubro;
            $http({
                method: 'DELETE',
                url: 'http://localhost:6901/api/Rubro/' + id,
                headers: {
                    'Accept': "application/json",

                }
            }).then(function (response) {
                if (response.status == 200) {
                    $scope.rubro.splice($scope.rubro.indexOf(rub, [0]), 1);
                    $scope.nuevoRubro();
                }
            }, function (response) {

                httpNegativo(response.status);

            }).then(function () {

            });
        }
        else {

        }

    }

    $scope.modificarRubro = function (rub) {
        var l1 = document.getElementById("GestionarRubro");
        l1.innerText = "Modificar Rubro";
        var l1 = document.getElementById("rubro");
        l1.value = rub.nombre;
        rubroModificar = rub.nombre;
        idRubroModificar = rub.idRubro;
        esNuevo = false;

    }
    $scope.nuevoRubro = function () {
        var l1 = document.getElementById("GestionarRubro");
        l1.innerText = "Nuevo Rubro";
        var l1 = document.getElementById("rubro");
        l1.value = "";
        esNuevo = true;
    }

})
app.controller("PerfilEmpresaController", function ($scope, $http) {


    $scope.contenidoATraer = '/Home/ComentariosRating';
    $("#jqxRating").jqxRating({
        width: 100, height: 35, value: retornarCalificacion(), disabled: true, precision: 0.5
    });


});
app.controller("PerfilClienteController", function ($scope, $http) {


    $scope.contenidoATraer = '/Home/ComentariosRating';
    $("#jqxRating").jqxRating({
        width: 100, height: 35, value: retornarCalificacion(), disabled: true, precision: 0.5
    });


});
app.controller("SchedulerController", function ($scope, $http) {


    $("#loader").jqxLoader({ width: 100, height: 60, imagePosition: 'bottom', theme: 'bootstrap', text: 'Cargando...', textPosition: 'top', isModal: true });

    /*
        TRAER INFORMACION DE LA EMPRESA   
    */
    $scope.parametros = [];
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/VistaParametrosAgendaEmpresa/' + retornarIdEmpresa(),
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.parametros);

            if ($scope.parametros.length > 0) {
                procesarParametros();
                configurar();
            }

        }

    }, function (response) {

        httpNegativoSinContenedor(response.status);

    }).then(function () {

    });

    /*
        Declaracion de variables
    */

    var primerDia = 100, ultimoDia = -1, horaDesde = 24, horaHasta = 1;
    var diasLaborables = [];
    var horarioLaborable = { from: { hora: 8, minutos: 00 }, to: { hora: 18, minutos: 00 } };
    var duracionTurnos = 0;



    /*
    CONFIGURACION DEL SCHEDULER
    */

    var localizacion = {
        days: {
            // full day names
            names: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            // abbreviated day names
            namesAbbr: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            // shortest day names
            namesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
        },
        months: {
            // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
            names: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", ""],
            // abbreviated month names
            namesAbbr: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec", ""]
        },
        loadString: "Cargando...",
        clearString: "Limpiar",
        todayString: "Hoy",
        dayViewString: "Día",
        weekViewString: "Semana",
        monthViewString: "Semana",
        toolBarPreviousButtonString: "Anterior",
        toolBarNextButtonString: "Siguiente",

    };
    function configurar() {

        var vista = [{
            type: 'weekView', workTime: { fromDayOfWeek: primerDia, toDayOfWeek: ultimoDia, fromHour: horaDesde, toHour: horaHasta }, timeRuler: {
                scale: 'tenMinutes', scaleStartHour: horaDesde - 1, scaleEndHour: horaHasta
            }
        }];

        var camposDatos = { description: "description", background: "background", draggable: "draggable", from: "from", id: "id", resizable: "resizable", readOnly: "readOnly", to: "to", tooltip: "tooltip", timeZone: "timeZone", subject: "subject", borderColor: "borderColor", resourceId: "calendar" };

        var appointments = [];

        var source =
        {
            dataType: "array",
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'draggable', type: 'boolean' },
                { name: 'resizable', type: 'boolean' },
                { name: 'readOnly', type: 'boolean' },
                { name: 'subject', type: 'string' },
                { name: 'background', type: 'string' },
                { name: 'borderColor', type: 'string' },
                { name: 'tooltip', type: 'string' },
                { name: 'calendar', type: 'string' },
                { name: 'timeZone', type: 'string' },
                { name: 'from', type: 'date' },
                { name: 'to', type: 'date' },

            ],
            id: 'id',
            localData: appointments
        };
        var adapter = new $.jqx.dataAdapter(source);
        $("#scheduler").jqxScheduler({
            date: new $.jqx.date('todayDate'),
            width: 850,
            height: 700,
            source: adapter,
            appointmentDataFields: camposDatos,
            appointmentTooltips: true,
            columnsHeight: 25,
            contextMenu: false,
            enableHover: false,
            editDialog: false,
            appointmentTooltips: false,
            //min: new $.jqx.date('todayDate'),
            localization: localizacion,
            legendPosition: 'top',
            theme: 'bootstrap',
            timeZone: 'Argentina Standard Time',
            view: 'weekView',
            showLegend: true,
            resources:
            {
                colorScheme: "scheme05",
                dataField: "calendar",
                source: new $.jqx.dataAdapter(source)
            },
            views: vista

        });

        cargarTurnos();
    }


    /*
    
    EVENTOS
    
    */

    $('#scheduler').on('cellClick', function (event) {//Crear nuevo turno


        if (!esFechaVieja(event.args.date)) {
            $('#loader').jqxLoader('open');

            var fechayhora = event.args.date;
            if ($.inArray(fechayhora.dayOfWeek(), diasLaborables) != -1) {
                if (esEsDentroDeHorario(fechayhora)) {

                    if (!esSobreTurno(fechayhora)) {//En tooltips guardo el id de cliente y el -1 del id turno porque no esta en base de datos


                        $http({
                            method: 'GET',
                            url: 'http://localhost:6901/api/agenda/' + retornarIdEmpresa() + '?mes=' + fechayhora.month() + '&anio=' + fechayhora.year(),
                            headers: {
                                'Accept': "application/json",

                            }
                        }).then(function (response) {
                            if (response.status === 200) {

                                var anio = fechayhora.year();
                                var mes = fechayhora.month();
                                var dia = fechayhora.day();


                                var horaDesde = fechayhora.hour() + ':' + fechayhora.minute();

                                var horaHasta = fechayhora.addMinutes(duracionTurnos).hour() + ':' + fechayhora.addMinutes(duracionTurnos).minute();

                                var nuevoTurno = { idAgenda: response.data.idAgenda, fecha: anio + '-' + mes + '-' + dia, horaDesde: horaDesde, horaHasta: horaHasta, idCliente: retornarIdCliente(), idEstado: 12 }

                                $http({
                                    method: 'POST',
                                    url: 'http://localhost:6901/api/Turno',
                                    data: nuevoTurno,
                                    headers: {
                                        'Accept': "application/json",

                                    }
                                }).then(function (response) {
                                    if (response.status == 201) {
                                        //TODO: Mensaje OK

                                        var turno = { description: "Turno", draggable: false, from: fechayhora, id: retornarIdCliente(), resizable: false, calendar: "Mi turno", readOnly: true, to: fechayhora.addMinutes(duracionTurnos), tooltip: retornarIdCliente() + '+' + response.data.idTurno, timeZone: 'Argentina Standard Time', subject: 'Mi turno', background: '#6EB97D', borderColor: '#6EB97D' };

                                        $('#scheduler').jqxScheduler('addAppointment', turno);

                                        notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), 200, 'success', 'Turno Creado');


                                    }
                                }, function (response) {

                                    httpNegativoSinContenedor(response.status);

                                }).then(function () {
                                    $('#loader').jqxLoader('close');
                                });



                            }

                        }, function (response) {

                            httpNegativoSinContenedor(response.status);

                        }).then(function () {



                        });


                    }
                }
                else {
                    //alert('No Trabaja en ese Horario');
                }
            } else {
                //alert('No Trabaja Ese dia');
            }

            //var args = event.args; var cell = args.cell; var date = args.date;
        } else {
            notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), 200, 'warning', 'Turno Invalido');

        }

    });
    $("#scheduler").on('appointmentClick', function (event) {//Eliminar Un turno
        if (!esFechaVieja(event.args.appointment.from)) {
            var args = event.args;
            var turno = args.appointment;

            if (turno.tooltip.split('+')[0] == retornarIdCliente()) {//Como no me deja crear nuevos campos de datos utilizo los tooltips para guardar el id cliente
                mostrarDialogo(
                    "Atención",
                    "Esta seguro que desea eliminar el turno?",
                    "Si",
                    "No",
                    function (button) {
                        $('#scheduler').jqxScheduler('deleteAppointment', turno.id);

                        eliminarTurno(turno);
                    },
                    function (button) {

                    });

            }
        }

    });

    /*
        Metodos usados
    */


    function cargarTurnos() {//Carga los turnos desde  la base de datos

        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/VistaTurnosAgendaVigenteParaClientes/' + retornarIdEmpresa(),
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.status == 200) {
                for (var i = 0; i < response.data.length; i++) {
                    var fecha = response.data[i].fecha.split("T")[0].split("-");
                    var año = parseInt(fecha[0]);
                    var mes = parseInt(fecha[1]);
                    var dia = parseInt(fecha[2]);

                    var desde = response.data[i].horaDesde.split(":");
                    var horaDesde = parseInt(desde[0]);
                    var minDesde = parseInt(desde[1]);
                    var hasta = response.data[i].horaHasta.split(":");
                    var horaHasta = parseInt(hasta[0]);
                    var minHasta = parseInt(hasta[1]);

                    var turno = {};
                    if (response.data[i].idCliente != retornarIdCliente()) {

                        turno = { description: "Turno", draggable: false, from: new $.jqx.date(año, mes, dia, horaDesde, minDesde, 0, 0), id: response.data[i].idCliente, resizable: false, calendar: "Ocupado", readOnly: true, to: new $.jqx.date(año, mes, dia, horaHasta, minHasta, 0, 0), tooltip: response.data[i].idCliente + "+" + response.data[i].idTurno, timeZone: 'Argentina Standard Time', subject: 'Ocupado', background: '#66BCE5', borderColor: '#66BCE5' };

                    }
                    else {
                        var turno = { description: "Turno", draggable: false, from: new $.jqx.date(año, mes, dia, horaDesde, minDesde, 0, 0), id: response.data[i].idCliente, resizable: false, calendar: "Mi turno", readOnly: true, to: new $.jqx.date(año, mes, dia, horaHasta, minHasta, 0, 0), tooltip: response.data[i].idCliente + "+" + response.data[i].idTurno, timeZone: 'Argentina Standard Time', subject: 'Mi turno', background: '#6EB97D', borderColor: '#6EB97D' };

                    }

                    $('#scheduler').jqxScheduler('addAppointment', turno);
                }
            }
        }, function (response) {

            httpNegativoSinContenedor(response.status);

        }).then(function () {

        });

    }

    function procesarParametros() {// Parametros de la agenda
        for (var i = 0; i < $scope.parametros.length; i++) {
            if ($scope.parametros[i].id_dia > ultimoDia) {
                ultimoDia = $scope.parametros[i].id_dia;
            };
            if ($scope.parametros[i].id_dia < primerDia) {
                primerDia = $scope.parametros[i].id_dia;

            };
            var resta = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).hour() - horaDesde;
            if (resta < 0) {
                horaDesde = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).hour();
                horarioLaborable.from.hora = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).hour();
                horarioLaborable.from.minutos = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).minute();
            };
            resta = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).hour() - horaHasta;
            if (resta > 0) {
                horaHasta = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).hour();
                horarioLaborable.to.hora = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).hour();
                horarioLaborable.to.minutos = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).minute();
            };

            diasLaborables.push($scope.parametros[i].id_dia);
        }
        duracionTurnos = $scope.parametros[0].duracion_turno;


    }
    function esEsDentroDeHorario(fechayhora) {//Para ver si hace click en un horario y dia laborable 


        if ((fechayhora.hour() >= horarioLaborable.from.hora) && (fechayhora.hour() < horarioLaborable.to.hora)) {
            var fechayhoraTurno = fechayhora.addMinutes(duracionTurnos);

            if ((fechayhoraTurno.hour() < horarioLaborable.to.hora) || ((fechayhoraTurno.hour() == horarioLaborable.to.hora) && fechayhoraTurno.minute() == 0)) {
                return true;
            }

        }
        return false;
    }
    function esSobreTurno(fechayhora) {//Para ver si es un sobre turno

        var turnos = $("#scheduler").jqxScheduler('getAppointments');

        var horaInicioNueva = fechayhora.hour();
        var minInicioNueva = fechayhora.minute();

        fechayhora.addMinutes(duracionTurnos);

        var horaFinNueva = fechayhora.hour();
        var minFinNueva = fechayhora.minute();


        for (var i = 0; i < turnos.length; i++) {
            if ((fechayhora.month() == turnos[i].from.month()) && (fechayhora.day() == turnos[i].from.day())) {

                var horaInicioEvaluando = turnos[i].from.hour();
                var minInicioEvaluando = turnos[i].from.minute();
                var horaFinEvaluando = turnos[i].to.hour();
                var minFinEvaluando = turnos[i].to.minute();

                if (((horaInicioNueva == horaInicioEvaluando) && (minInicioNueva == minInicioEvaluando))) {
                    return true;
                }
                if (((horaInicioNueva >= horaInicioEvaluando) && (horaInicioNueva <= horaFinEvaluando)) && (minInicioNueva < minInicioEvaluando) && (minInicioNueva > minFinEvaluando)) {
                    return true;
                }
                if (((horaFinNueva <= horaInicioEvaluando) && (horaFinNueva >= horaFinEvaluando)) && (minFinNueva >= minInicioEvaluando) && (minFinNueva < minFinEvaluando)) {
                    return true;
                }
                if (((horaInicioNueva == horaInicioEvaluando) && (minInicioNueva <= minInicioEvaluando) && (minFinNueva < minFinEvaluando))) {
                    return true;
                }

            }
        }
        return false;
    }

    function esFechaVieja(fechayhora) {

        var nowAnio = new $.jqx.date().year();
        var nowMes = new $.jqx.date().month();
        var nowDia = new $.jqx.date().day();

        var anioTurno = fechayhora.year();
        var mesTurno = fechayhora.month();
        var diaTurno = fechayhora.day();


        if (anioTurno >= nowAnio) {

            if (mesTurno < nowMes || (mesTurno == nowMes && diaTurno <= nowDia)) {
                return true;
            }

        } else {
            return true;
        }

        return false;

    }

    function eliminarTurno(turno) {

        idTurno = turno.tooltip.split('+')[1];

        $http({
            method: 'DELETE',
            url: 'http://localhost:6901/api/Turno/' + idTurno,
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.status == 200) {
                notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), 200, 'info', 'Turno Eliminado');
            }
        }, function (response) {

            httpNegativoSinContenedor(response.status);

        }).then(function () {

        });

    }




});
app.controller("ComentariosRatingController", function ($scope, $http) {

    (function ($) {
        /**
         * attaches a character counter to each textarea element in the jQuery object
         * usage: $("#myTextArea").charCounter(max, settings);
         */

        $.fn.charCounter = function (max, settings) {
            max = max || 100;
            settings = $.extend({
                container: "<span></span>",
                classname: "charcounter",
                format: "(%1 characters remaining)",
                pulse: true,
                delay: 0
            }, settings);
            var p, timeout;

            function count(el, container) {
                el = $(el);
                if (el.val().length > max) {
                    el.val(el.val().substring(0, max));
                    if (settings.pulse && !p) {
                        pulse(container, true);
                    };
                };
                if (settings.delay > 0) {
                    if (timeout) {
                        window.clearTimeout(timeout);
                    }
                    timeout = window.setTimeout(function () {
                        container.html(settings.format.replace(/%1/, (max - el.val().length)));
                    }, settings.delay);
                } else {
                    container.html(settings.format.replace(/%1/, (max - el.val().length)));
                }
            };

            function pulse(el, again) {
                if (p) {
                    window.clearTimeout(p);
                    p = null;
                };
                el.animate({ opacity: 0.1 }, 100, function () {
                    $(this).animate({ opacity: 1.0 }, 100);
                });
                if (again) {
                    p = window.setTimeout(function () { pulse(el) }, 200);
                };
            };

            return this.each(function () {
                var container;
                if (!settings.container.match(/^<.+>$/)) {
                    // use existing element to hold counter message
                    container = $(settings.container);
                } else {
                    // append element to hold counter message (clean up old element first)
                    $(this).next("." + settings.classname).remove();
                    container = $(settings.container)
                                    .insertAfter(this)
                                    .addClass(settings.classname);
                }
                $(this)
                    .unbind(".charCounter")
                    .bind("keydown.charCounter", function () { count(this, container); })
                    .bind("keypress.charCounter", function () { count(this, container); })
                    .bind("keyup.charCounter", function () { count(this, container); })
                    .bind("focus.charCounter", function () { count(this, container); })
                    .bind("mouseover.charCounter", function () { count(this, container); })
                    .bind("mouseout.charCounter", function () { count(this, container); })
                    .bind("paste.charCounter", function () {
                        var me = this;
                        setTimeout(function () { count(me, container); }, 10);
                    });
                if (this.addEventListener) {
                    this.addEventListener('input', function () { count(this, container); }, false);
                };
                count(this, container);
            });
        };

    })(jQuery);

    $(function () {
        $(".counted").charCounter(200, { container: "#counter" });
    });



    $scope.comentarios = [];
    $scope.nuevoTitulo;
    $scope.nuevoComentario;
    $scope.fechaNuevoComentario;
    $scope.nroNuevoComentario;
    $scope.objetoComentario = {};

    $scope.guardarComentario = function () {
        $scope.nroNuevoComentario = $('#nuevaEstrella').jqxRating('getValue');
        $scope.objetoComentario = { titulo: $scope.nuevoTitulo, nro: $scope.nroNuevoComentario, comentario: $scope.nuevoComentario, fecha_comentario: new Date(), id_direccion: 1, id_Empresa: retornarIdEmpresa(), id_cliente: retornarIdCliente() }

        $http({
            method: 'POST',
            url: 'http://localhost:6901/api/Comentarios',
            data: $scope.objetoComentario,
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.status == 201) {
                //TODO: Mensaje OK

            }
        }, function (response) {

            httpNegativo(response.status);

        }).then(function () {

        });
    }

    $scope.verCalificacion = function () {
        for (var i = 0; i < $scope.comentarios.length; i++) {
            if ($scope.comentarios[i].nro != null) {
                var estrella = $('#estrella' + $scope.comentarios[i].Id_comentario);
                if (estrella.length > 0) {
                    estrella.jqxRating({
                        width: 100, height: 35, value: $scope.comentarios[i].nro, disabled: true, precision: 0.5
                    });
                }
            }
        }



    }

    $("#nuevaEstrella").jqxRating({
        width: 350,
        height: 35,
        value: 0
    });

    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/VistaComentariosAEmpresa/' + retornarIdEmpresa(),
        headers: {
            'Accept': "application/json"
        }

    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.comentarios);
        }

    }, function (response) {

        httpNegativo(response.status);

    }).then(function () {

    });



});
app.controller("ComentariosRatingClienteController", function ($scope, $http) {

    (function ($) {
        /**
         * attaches a character counter to each textarea element in the jQuery object
         * usage: $("#myTextArea").charCounter(max, settings);
         */

        $.fn.charCounter = function (max, settings) {
            max = max || 100;
            settings = $.extend({
                container: "<span></span>",
                classname: "charcounter",
                format: "(%1 characters remaining)",
                pulse: true,
                delay: 0
            }, settings);
            var p, timeout;

            function count(el, container) {
                el = $(el);
                if (el.val().length > max) {
                    el.val(el.val().substring(0, max));
                    if (settings.pulse && !p) {
                        pulse(container, true);
                    };
                };
                if (settings.delay > 0) {
                    if (timeout) {
                        window.clearTimeout(timeout);
                    }
                    timeout = window.setTimeout(function () {
                        container.html(settings.format.replace(/%1/, (max - el.val().length)));
                    }, settings.delay);
                } else {
                    container.html(settings.format.replace(/%1/, (max - el.val().length)));
                }
            };

            function pulse(el, again) {
                if (p) {
                    window.clearTimeout(p);
                    p = null;
                };
                el.animate({ opacity: 0.1 }, 100, function () {
                    $(this).animate({ opacity: 1.0 }, 100);
                });
                if (again) {
                    p = window.setTimeout(function () { pulse(el) }, 200);
                };
            };

            return this.each(function () {
                var container;
                if (!settings.container.match(/^<.+>$/)) {
                    // use existing element to hold counter message
                    container = $(settings.container);
                } else {
                    // append element to hold counter message (clean up old element first)
                    $(this).next("." + settings.classname).remove();
                    container = $(settings.container)
                                    .insertAfter(this)
                                    .addClass(settings.classname);
                }
                $(this)
                    .unbind(".charCounter")
                    .bind("keydown.charCounter", function () { count(this, container); })
                    .bind("keypress.charCounter", function () { count(this, container); })
                    .bind("keyup.charCounter", function () { count(this, container); })
                    .bind("focus.charCounter", function () { count(this, container); })
                    .bind("mouseover.charCounter", function () { count(this, container); })
                    .bind("mouseout.charCounter", function () { count(this, container); })
                    .bind("paste.charCounter", function () {
                        var me = this;
                        setTimeout(function () { count(me, container); }, 10);
                    });
                if (this.addEventListener) {
                    this.addEventListener('input', function () { count(this, container); }, false);
                };
                count(this, container);
            });
        };

    })(jQuery);

    $(function () {
        $(".counted").charCounter(200, { container: "#counter" });
    });


    $scope.comentarios = [];
    $scope.nuevoTitulo;
    $scope.nuevoComentario;
    $scope.fechaNuevoComentario;
    $scope.nroNuevoComentario;
    $scope.objetoComentario = {};

    $scope.guardarComentario = function () {
        $scope.nroNuevoComentario = $('#nuevaEstrella').jqxRating('getValue');
        $scope.objetoComentario = { titulo: $scope.nuevoTitulo, nro: $scope.nroNuevoComentario, comentario: $scope.nuevoComentario, fecha_comentario: new Date(), id_direccion: 2, id_Empresa: retornarIdEmpresa(), id_cliente: retornarIdCliente() }

        $http({
            method: 'POST',
            url: 'http://localhost:6901/api/ComentariosACliente',
            data: $scope.objetoComentario,
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.status == 201) {
                //TODO: Mensaje OK

            }
        }, function (response) {

            httpNegativo(response.status);

        }).then(function () {

        });
    }

    $scope.verCalificacion = function () {
        for (var i = 0; i < $scope.comentarios.length; i++) {
            if ($scope.comentarios[i].nro != null) {
                var estrella = $('#estrella' + $scope.comentarios[i].Id_comentario);
                if (estrella.length > 0) {
                    estrella.jqxRating({
                        width: 100, height: 35, value: $scope.comentarios[i].nro, disabled: true, precision: 0.5
                    });
                }
            }
        }



    }

    $("#nuevaEstrella").jqxRating({
        width: 350,
        height: 35,
        value: 0
    });

    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/VistaComentariosACliente/' + retornarIdCliente(),
        headers: {
            'Accept': "application/json"
        }

    }).then(function (response) {
        if (response.status === 200) {
            angular.copy(response.data, $scope.comentarios);
        }

    }, function (response) {

        httpNegativo(response.status);

    }).then(function () {

    });



});
app.controller("VisualizarAgendaController", function ($scope, $http) {

    $("#loader").jqxLoader({ width: 100, height: 60, imagePosition: 'bottom', theme: 'bootstrap', text: 'Cargando...', textPosition: 'top', isModal: true });


    /*
            TRAER INFORMACION DE LA EMPRESA  
 
    */
    $scope.parametros = [];
    $http({
        method: 'GET',
        url: 'http://localhost:6901/api/VistaParametrosAgendaEmpresa/' + retornarIdEmpresa(),
        headers: {
            'Accept': "application/json",

        }
    }).then(function (response) {
        if (response.status === 200) {

            $('#loader').jqxLoader('open');
            angular.copy(response.data, $scope.parametros);

            procesarParametros();
            configurar();

        }

    }, function (response) {

        httpNegativoSinContenedor(response.status);

    }).then(function () {

        $('#loader').jqxLoader('close');
    });

    /*
        Declaracion de variables
    */

    var primerDia = 100, ultimoDia = -1, horaDesde = 24, horaHasta = 1;
    var diasLaborables = [];
    var horarioLaborable = { from: { hora: 8, minutos: 00 }, to: { hora: 18, minutos: 00 } };
    var duracionTurnos = 0;
    /*
        CONFIGURACION DEL SCHEDULER
        */

    var localizacion = {
        days: {
            // full day names
            names: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            // abbreviated day names
            namesAbbr: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            // shortest day names
            namesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
        },
        months: {
            // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
            names: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", ""],
            // abbreviated month names
            namesAbbr: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec", ""]
        },
        agendaViewString: "Agenda",
        agendaDateColumn: "Fecha",
        agendaTimeColumn: "Hora",
        agendaAppointmentColumn: "Turno",
        emptyDataString: "Sin Turnos",
        loadString: "Cargando...",
        clearString: "Limpiar",
        todayString: "Hoy",
        dayViewString: "Día",
        weekViewString: "Semana",
        monthViewString: "Semana",
        toolBarPreviousButtonString: "Anterior",
        toolBarNextButtonString: "Siguiente",

    };
    function configurar() {

        var vista = [{
            type: 'agendaView', workTime: { fromDayOfWeek: primerDia, toDayOfWeek: ultimoDia, fromHour: horaDesde, toHour: horaHasta }, timeRuler: {
                scale: 'tenMinutes', scaleStartHour: horaDesde - 1, scaleEndHour: horaHasta
            }
        }];

        var camposDatos = { description: "description", draggable: "draggable", from: "from", id: "id", resizable: "resizable", readOnly: "readOnly", to: "to", tooltip: "tooltip", timeZone: "timeZone", subject: "subject", resourceId: "calendar" };

        var appointments = [];

        cargarTurnos();

        var source =
        {
            dataType: "array",
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'draggable', type: 'boolean' },
                { name: 'resizable', type: 'boolean' },
                { name: 'readOnly', type: 'boolean' },
                { name: 'subject', type: 'string' },
                { name: 'tooltip', type: 'string' },
                { name: 'calendar', type: 'string' },
                { name: 'timeZone', type: 'string' },
                { name: 'from', type: 'date' },
                { name: 'to', type: 'date' },

            ],
            id: 'id',
            localData: appointments
        };
        var adapter = new $.jqx.dataAdapter(source);
        $("#scheduler").jqxScheduler({
            date: new $.jqx.date('todayDate'),
            width: 850,
            height: 500,
            source: adapter,
            appointmentDataFields: camposDatos,
            appointmentTooltips: false,
            columnsHeight: 25,
            contextMenu: false,
            enableHover: false,
            editDialog: false,
            appointmentTooltips: false,
            //min: new $.jqx.date('todayDate'),
            localization: localizacion,
            legendPosition: 'top',

            timeZone: 'Argentina Standard Time',
            view: 'agendaView',
            showLegend: true,
            resources:
            {
                colorScheme: "scheme01",
                dataField: "calendar",
                source: new $.jqx.dataAdapter(source)
            },
            views: vista

        });


    }

    /*
    
    EVENTOS
    
    */

    $('#scheduler').on('cellClick', function (event) {//Crear nuevo turno

        var anio = event.args.date.year();
        var mes = event.args.date.month();
        var dia = event.args.date.day();


        var turnos = event.args.owner.appointments;

        switch (event.args.cell.childNodes["0"].className) {
            case 'jqx-scheduler-agenda-date':
                if (!esFechaVieja(event.args.date)) {


                    mostrarDialogo(
                                    "Atención",
                                    "Está seguro que desea <b>Cancelar Todos</b> los turnos del <b>" + dia + '/' + mes + '/' + anio + '</b>?',
                                    "Si",
                                    "No",
                                    function (button) {
                                        $http({
                                            method: 'PUT',
                                            url: 'http://localhost:6901/api/Turno?fecha=' + anio + '-' + mes + '-' + dia,
                                            headers: {
                                                'Accept': "application/json",

                                            }
                                        }).then(function (response) {
                                            if (response.status === 200) {

                                                notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), 200, 'info', 'Se cancelaron todos los turnos');
                                                vaciarTurnos(event);
                                                cargarTurnos();

                                            }
                                        }, function (response) {

                                            httpNegativo(response.status);

                                        }).then(function () {

                                        });
                                    },
                                    function (button) {

                                    });
                }
                break;
            case 'jqx-scheduler-agenda-time':

                var horaDesde = Number(event.args.cell.innerText.split('-')[0].split(':')[0]);
                var minDesde = Number(event.args.cell.innerText.split('-')[0].split(':')[1].trim());

                if (!esFechaVieja(event.args.date)) {

                    var obtenerIdTurno = function () {
                        for (var i = 0; i < turnos.length; i++) {

                            var anioTurnoRevisado = turnos[i].from.year();
                            var mesTurnoRevisado = turnos[i].from.month();
                            var diaTurnoRevisado = turnos[i].from.day();

                            var horaDesdeTurnoRevisado = turnos[i].from.hour();
                            var minDesdeTurnoRevisado = turnos[i].from.minute();

                            if (anioTurnoRevisado == anio && mesTurnoRevisado == mes && diaTurnoRevisado == dia && horaDesdeTurnoRevisado == horaDesde && minDesdeTurnoRevisado == minDesde) {
                                return turnos[i].tooltip.split('+')[1];
                            }
                        }

                    };;
                    mostrarDialogo(
                                    "Atención",
                                    "Está seguro que desea <b>Cancelar el Turno</b> de <b>" + event.args.cell.innerText + '</b>?',
                                    "Si",
                                    "No",
                                    function (button) {
                                        $http({
                                            method: 'PUT',
                                            url: 'http://localhost:6901/api/Turno/' + obtenerIdTurno(),
                                            headers: {
                                                'Accept': "application/json",

                                            }
                                        }).then(function (response) {
                                            if (response.status === 200) {

                                                notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), 200, 'info', 'Se canceló el turno');
                                                vaciarTurnos(event);
                                                cargarTurnos();

                                            }
                                        }, function (response) {

                                            httpNegativo(response.status);

                                        }).then(function () {

                                        });
                                    },
                                    function (button) {

                                    });
                }
                break;
            case 'jqx-scheduler-agenda-appointment jqx-scheduler-legend-label':



                if (esFechaVieja(event.args.date)) {

                    var obtenerIdTurno = function () {

                        return event.args.owner.appointmentsByKey[event.args.cell.childNodes["0"].dataset.key].tooltip.split('+')[1];


                    };
                    mostrarDialogo(
                                   "Registro de asistencia",
                                   "Confirma que <b>" + event.args.cell.innerText + " Asistió</b> al turno?",
                                   "Asistió",
                                   "Ausente",
                                   function (button) {
                                       $http({
                                           method: 'PUT',
                                           url: 'http://localhost:6901/api/Turno/' + obtenerIdTurno() + '?asistio=true',
                                           headers: {
                                               'Accept': "application/json",

                                           }
                                       }).then(function (response) {
                                           if (response.status === 200) {

                                               notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), 200, 'info', 'Se registró la asistencia');
                                               vaciarTurnos(event);
                                               cargarTurnos();

                                           }
                                       }, function (response) {

                                           httpNegativo(response.status);

                                       }).then(function () {

                                       });
                                   },
                                   function (button) {
                                       $http({
                                           method: 'PUT',
                                           url: 'http://localhost:6901/api/Turno/' + obtenerIdTurno() + '?asistio=false',
                                           headers: {
                                               'Accept': "application/json",

                                           }
                                       }).then(function (response) {
                                           if (response.status === 200) {

                                               notificarSinContenedor($("#notificaciones"), $("#mensajeNotificacion"), 200, 'info', 'Se registró la ausencia');
                                               vaciarTurnos(event);
                                               cargarTurnos();

                                           }
                                       }, function (response) {

                                           httpNegativo(response.status);

                                       }).then(function () {

                                       });
                                   });

                }

                break;

        }

    });

    /*
         Metodos usados
    */


    function cargarTurnos() {//Carga los turnos desde  la base de datos

        $http({
            method: 'GET',
            url: 'http://localhost:6901/api/VistaTurnosAgendaVigenteParaEmpresa/' + retornarIdEmpresa(),
            headers: {
                'Accept': "application/json",

            }
        }).then(function (response) {
            if (response.status == 200) {
                for (var i = 0; i < response.data.length; i++) {
                    var fecha = response.data[i].fecha.split("T")[0].split("-");
                    var año = parseInt(fecha[0]);
                    var mes = parseInt(fecha[1]);
                    var dia = parseInt(fecha[2]);

                    var desde = response.data[i].horaDesde.split(":");
                    var horaDesde = parseInt(desde[0]);
                    var minDesde = parseInt(desde[1]);
                    var hasta = response.data[i].horaHasta.split(":");
                    var horaHasta = parseInt(hasta[0]);
                    var minHasta = parseInt(hasta[1]);
                    var usuario = response.data[i].usuario;

                    var urlBase = '/home/perfilcliente/' + usuario

                    var turno = {
                        description: "Turno",
                        draggable: false,
                        from: new $.jqx.date(año, mes, dia, horaDesde, minDesde, 0, 0),
                        id: response.data[i].idCliente,
                        resizable: false, calendar: 'Room 1',
                        readOnly: true,
                        to: new $.jqx.date(año, mes, dia, horaHasta, minHasta, 0, 0),
                        tooltip: response.data[i].idCliente + "+" + response.data[i].idTurno,
                        timeZone: 'Argentina Standard Time',
                        subject: "<a class=\"btn-primary\" href=" + urlBase + ">" + response.data[i].nombre + " " + response.data[i].apellido + "</a>"
                    };

                    

                    $('#scheduler').jqxScheduler('addAppointment', turno);
                }
            }
        }, function (response) {

            httpNegativoSinContenedor(response.status);

        }).then(function () {

        });

    }

    function procesarParametros() {// Parametros de la agenda
        for (var i = 0; i < $scope.parametros.length; i++) {
            if ($scope.parametros[i].id_dia > ultimoDia) {
                ultimoDia = $scope.parametros[i].id_dia;
            };
            if ($scope.parametros[i].id_dia < primerDia) {
                primerDia = $scope.parametros[i].id_dia;

            };
            var resta = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).hour() - horaDesde;
            if (resta < 0) {
                horaDesde = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).hour();
                horarioLaborable.from.hora = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).hour();
                horarioLaborable.from.minutos = moment('1900-01-01 ' + $scope.parametros[i].hora_inicio).minute();
            };
            resta = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).hour() - horaHasta;
            if (resta > 0) {
                horaHasta = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).hour();
                horarioLaborable.to.hora = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).hour();
                horarioLaborable.to.minutos = moment('1900-01-01 ' + $scope.parametros[i].hora_fin).minute();
            };

            diasLaborables.push($scope.parametros[i].id_dia);
        }
        duracionTurnos = $scope.parametros[0].duracion_turno;


    }
    function esFechaVieja(fechayhora) {

        var nowAnio = new $.jqx.date().year();
        var nowMes = new $.jqx.date().month();
        var nowDia = new $.jqx.date().day();

        var anioTurno = fechayhora.year();
        var mesTurno = fechayhora.month();
        var diaTurno = fechayhora.day();


        if (anioTurno >= nowAnio) {

            if (mesTurno < nowMes || (mesTurno == nowMes && diaTurno <= nowDia)) {
                return true;
            }

        } else {
            return true;
        }

        return false;

    }
    function vaciarTurnos(event) {

        var ids = [];

        for (var i = 0; i < event.owner.appointments.length; i++) {
            ids.push(event.owner.appointments[i].id);
        }
        for (var i = 0; i < ids.length; i++) {
            $('#scheduler').jqxScheduler('deleteAppointment', ids[i]);
        }



    }



});




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
        width: 300, position: "top-left", opacity: 0.9, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000,
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
var mostrarDialogo = function (titulo, texto, botonAfirmativo, botonNegativo, hacerPorAfirmativo, hacerPorNegativo) {
    $.confirm({
        title: titulo,
        text: texto,
        confirmButton: botonAfirmativo,
        cancelButton: botonNegativo,
        confirm: hacerPorAfirmativo,
        cancel: hacerPorNegativo
    });
}
