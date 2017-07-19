using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Test
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class InicioPage : ContentPage
    {
        public InicioPage()
        {
            InitializeComponent();
        }

        public void btnLoginClicked (Object sender, EventArgs e)
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
        }
    }
}