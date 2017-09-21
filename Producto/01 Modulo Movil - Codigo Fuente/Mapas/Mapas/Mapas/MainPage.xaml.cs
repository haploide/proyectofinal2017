using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Mapas
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        public void btnNuevoTurnoClicked(Object sender, EventArgs e)
        {
            this.Navigation.PushModalAsync(new MapPage());
        }
    }
}
