using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms.Maps;
using Xamarin.Forms;

namespace GeoTurnosMobile
{
    class MapPage : ContentPage
    {
        public Map myMap;
        public MapPage()
        {
            var settings = new ToolbarItem
            {

            };

            this.ToolbarItems.Add(settings);

            myMap = new Map(
            MapSpan.FromCenterAndRadius(new Position(-31.42, -64.19), Distance.FromMiles(0.3)))
            {

                IsShowingUser = true,
                HeightRequest = 200,
                WidthRequest = 320,
                VerticalOptions = LayoutOptions.FillAndExpand,
                MapType = MapType.Street
            };


            //var slider = new Slider(1, 18, 1);
            //slider.ValueChanged += (sender, e) => {
            //    var zoomLevel = e.NewValue; // between 1 and 18
            //    var latlongdegrees = 360 / (Math.Pow(2, zoomLevel));
            //    myMap.MoveToRegion(new MapSpan(myMap.VisibleRegion.Center, latlongdegrees, latlongdegrees));
            //};



            var stack = new StackLayout { Spacing = 0 };
            stack.Children.Add(myMap);
            Content = stack;
        }
    }
}
