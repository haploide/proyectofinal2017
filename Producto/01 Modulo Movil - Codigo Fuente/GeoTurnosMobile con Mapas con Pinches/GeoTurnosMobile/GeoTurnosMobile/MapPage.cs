using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms.Maps;
using Xamarin.Forms;
using GeoTurnosMobile.Models;

namespace GeoTurnosMobile
{
    class MapPage : ContentPage
    {
        public Map myMap;
        public MapPage(List<VistaFiltroEmpresa> LstDire, int n)
        {
            myMap = new Map(
            MapSpan.FromCenterAndRadius(new Position(-31.42, -64.19), Distance.FromMiles(0.3)))
            {

                IsShowingUser = true,
                HeightRequest = 200,
                WidthRequest = 320,
                VerticalOptions = LayoutOptions.FillAndExpand,
                MapType = MapType.Street
            };

            
            List<Pin> LstPin = new List<Pin>();
            double lat;
            double lon;
            foreach (var VistaFiltroEmpresa in LstDire)
            {

                if(VistaFiltroEmpresa.idRubro==n)
                { 

               lat = double.Parse(VistaFiltroEmpresa.latitud.ToString());
               lon = double.Parse(VistaFiltroEmpresa.longitud.ToString());

                Pin MyPin = new Pin()
                {
                    Position = new Position(lat, lon),
                    Label = VistaFiltroEmpresa.razonSocial.ToString()
                //MyPin.Clicked += (Sender, Args) => { DisplayAlert("Razon Social", VistaFiltroEmpresa.razonSocial.ToString(), "OK"); }
                };
                LstPin.Add(MyPin);
                
                myMap.Pins.Add(MyPin);
                }

            }
            
            
            var stack = new StackLayout { Spacing = 0 };
            stack.Children.Add(myMap);
            Content = stack;

           
        }




        public MapPage(List<VistaFiltroEmpresa> LstNom, string entidad)
        {
            myMap = new Map(
            MapSpan.FromCenterAndRadius(new Position(-31.42, -64.19), Distance.FromMiles(0.3)))
            {

                IsShowingUser = true,
                HeightRequest = 200,
                WidthRequest = 320,
                VerticalOptions = LayoutOptions.FillAndExpand,
                MapType = MapType.Street
            };


            List<Pin> LstPin = new List<Pin>();
            double lat;
            double lon;
            foreach (var VistaFiltroEmpresa in LstNom)
            {

                if (string.Compare(VistaFiltroEmpresa.razonSocial.ToString().ToLower(), entidad.ToString().ToLower())==0)
                {

                    lat = double.Parse(VistaFiltroEmpresa.latitud.ToString());
                    lon = double.Parse(VistaFiltroEmpresa.longitud.ToString());

                    Pin MyPin = new Pin()
                    {
                        Position = new Position(lat, lon),
                        Label = VistaFiltroEmpresa.razonSocial.ToString()
                        //MyPin.Clicked += (Sender, Args) => { DisplayAlert("Razon Social", VistaFiltroEmpresa.razonSocial.ToString(), "OK"); }
                    };
                    LstPin.Add(MyPin);

                    myMap.Pins.Add(MyPin);
                    break;
                }

            }


            var stack = new StackLayout { Spacing = 0 };
            stack.Children.Add(myMap);
            Content = stack;

        }







    }
}
