using Org.BouncyCastle.Crypto.Digests;
using System;
using System.Net.Http;
using System.Text;
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
            estaEsperando(true);
            
            try
            {
                HttpClient cliente = new HttpClient();
                cliente.BaseAddress = new Uri("http://192.168.1.111:8081");
                string url = string.Format("/api/login?usuario={0}&password={1}", usuarioEntry.Text, Hashear(passEntry.Text).ToUpper());
                var response = await cliente.GetAsync(url);

                estaEsperando(false);

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
                await Navigation.PushModalAsync(new MenuPrincipal());
                //////////////////////////////////////////
            }
            catch (Exception ex)
            {
                estaEsperando(false);

                await DisplayAlert("Error", ex.Message, "Aceptar");
                
            }
        }

        public void btnOlvidoPassClicked(Object sender, EventArgs e)
        {
            this.Navigation.PushModalAsync(new OlvidoPassword());
        }

        public void btnRegistrarseClicked(Object sender, EventArgs e)
        {
            Device.OpenUri(new Uri("http://192.168.1.111:8080"));
        }
        private void estaEsperando(bool esperar)
        {
            awaitActivityIndicator.IsRunning = esperar;
            btnLogin.IsEnabled = !esperar;
            usuarioEntry.IsEnabled = !esperar;
            passEntry.IsEnabled = !esperar;
            btnOlvidoPass.IsEnabled = !esperar;
            btnRegistrarse.IsEnabled = !esperar;

        }
        private string Hashear(string textoPlano)
        {
            var encodeData = Encoding.UTF8.GetBytes(textoPlano);

            Sha256Digest hash = new Sha256Digest();

            hash.BlockUpdate(encodeData, 0, encodeData.Length);

            byte[] compArr = new byte[hash.GetDigestSize()];

            hash.DoFinal(compArr, 0);

            StringBuilder sb = new StringBuilder();
            
            for (int i = 0; i < compArr.Length; i++)
            {
                sb.Append(compArr[i].ToString("x2"));
            }
                      
            return sb.ToString();
        }

    }
}
