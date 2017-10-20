using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using GeoTurnosMobile.Models;

namespace GeoTurnosMobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class BusquedaPorFiltro : ContentPage
    {
        public BusquedaPorFiltro()
        {
            InitializeComponent();
        }

        private void btnBuscar_Clicked(object sender, EventArgs e)
        {
            mostrarSoloUnaEntidad();
        }

        private async void mostrarSoloUnaEntidad()
        {
            List<VistaFiltroEmpresa> LstNom = new List<VistaFiltroEmpresa>(); //Crear estructura de datos q almacenara las coordenadas
            try
            {
                HttpClient cliente = new HttpClient();
                cliente.BaseAddress = new Uri("http://192.168.1.111:8081");
                cliente.MaxResponseContentBufferSize = 2560000000;

                string url = string.Format("/api/VistaFiltroEmpresa");
                var response = await cliente.GetAsync(url);                   //hace el get

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    LstNom = JsonConvert.DeserializeObject<List<VistaFiltroEmpresa>>(content); //Asignar a la estructura de datos el json

                    await this.Navigation.PushModalAsync(new MapPage(LstNom,empresaEntry.Text));

                }
            }
            catch (Exception ex)
            {

            }


        }

        async void OnModeChosen (object sender, EventArgs args)
        {
            Picker modePicker = (Picker)sender;

            int mode = modePicker.SelectedIndex;
            switch (mode)
            {
                case 0://Peluqueria
                    mostrarEntidades(1);
                    break;
                case 1://Cancha de Futbol
                    mostrarEntidades(2);
                    break;
                case 2://Desntista 
                    mostrarEntidades(3);
                    break;
                case 3://Taller mecánico
                    mostrarEntidades(4);
                    break;
                    
            }
        }

        private async void mostrarEntidades(int n)
        {
            List<VistaFiltroEmpresa> LstDire = new List<VistaFiltroEmpresa>(); //Crear estructura de datos q almacenara las coordenadas
            try
            {
                HttpClient cliente = new HttpClient();
                cliente.BaseAddress = new Uri("http://192.168.1.111:8081");
                cliente.MaxResponseContentBufferSize = 2560000000;

                string url = string.Format("/api/VistaFiltroEmpresa");
                var response = await cliente.GetAsync(url);                   //hace el get

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    LstDire = JsonConvert.DeserializeObject<List<VistaFiltroEmpresa>>(content); //Asignar a la estructura de datos el json

                    await this.Navigation.PushModalAsync(new MapPage(LstDire,n));

                }
            }
            catch (Exception ex)
            {

            }

        }
    }
}