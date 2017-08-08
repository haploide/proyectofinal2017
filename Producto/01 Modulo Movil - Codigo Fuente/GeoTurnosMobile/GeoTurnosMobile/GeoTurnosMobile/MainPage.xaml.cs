using System;
using System.Net.Http;
using Xamarin.Forms;

namespace GeoTurnosMobile
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        public async void btnLoginClicked(Object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(usuarioEntry.Text))
            {
                await DisplayAlert("Error", "Debe ingresar su usuario", "Aceptar");
                usuarioEntry.Focus();
                return;
            }
            if (string.IsNullOrEmpty(passEntry.Text))
            {
                await DisplayAlert("Error", "Debe ingresar su Password", "Aceptar");
                passEntry.Focus();
                return;
            }

            awaitActivityIndicator.IsRunning = true;
            btnLogin.IsEnabled = false;
            try
            {
                HttpClient cliente = new HttpClient();
                cliente.BaseAddress = new Uri("http://localhost:6901/");
                string url = string.Format("/api/login?usuario={0}&password={1}", usuarioEntry.Text, passEntry.Text);
                var response = await cliente.GetAsync(url);

                btnLogin.IsEnabled = true;
                awaitActivityIndicator.IsRunning = false;

                if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                {
                    await DisplayAlert("Error", "Error al procesar la solicitud. Por favor inténtalo nuevamente", "Aceptar");
                    passEntry.Focus();
                    return;
                }

                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    await DisplayAlert("Error", "Usuario o Password Incorrecto", "Aceptar");
                    passEntry.Focus();
                    return;
                }




                ///////////////////////////////////////////
                //Si se loguea se redirecciona a 
                await this.Navigation.PushModalAsync(new MenuPrincipal());
                //////////////////////////////////////////
            }
            catch (Exception ex)
            {
                btnLogin.IsEnabled = true;
                awaitActivityIndicator.IsRunning = false;

                await DisplayAlert("Error", ex.Message, "Aceptar");
                
            }
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
