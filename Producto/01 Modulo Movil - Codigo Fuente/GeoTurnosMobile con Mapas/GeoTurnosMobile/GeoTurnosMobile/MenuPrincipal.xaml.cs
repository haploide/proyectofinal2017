using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace GeoTurnosMobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MenuPrincipal : ContentPage
    {
        public MenuPrincipal()
        {
            InitializeComponent();
        }

        public void btnNuevoTurnoClicked(Object sender, EventArgs e)
        {
            this.Navigation.PushModalAsync(new MapPage());
        }

        public void btnMisTurnosClicked(Object sender, EventArgs e)
        {

        }
    }
}