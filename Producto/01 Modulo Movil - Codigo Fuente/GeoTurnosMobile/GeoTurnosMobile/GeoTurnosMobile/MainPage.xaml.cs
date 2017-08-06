using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace GeoTurnosMobile
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        public void btnLoginClicked(Object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(usuarioEntry.Text))
            {
                usuarioEntry.Placeholder = "Debe ingresar su usuario";
                usuarioEntry.Focus();
                return;
            }
            if (string.IsNullOrEmpty(passEntry.Text))
            {
                passEntry.Placeholder = "Debe ingresar su Password";
                passEntry.Focus();
                return;
            }


            ///////////////////////////////////////////
            //Si se loguea se redirecciona a 
            this.Navigation.PushModalAsync(new MenuPrincipal());
            //////////////////////////////////////////
        }

        public void btnOlvidoPassClicked(Object sender, EventArgs e)
        {
            this.Navigation.PushModalAsync(new OlvidoPassword());
        }

        public void btnRegistrarseClicked(Object sender, EventArgs e)
        {
            Device.OpenUri(new Uri("http://www.google.com"));
        }
    }
}
