using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebApi.Models;
using WebSite.App_Start;
using WebSite.Models;

namespace WebSite.Controllers
{
    public class HomeController : Controller
    {
   
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
       
        public ActionResult Contact()
        {

            ViewBag.Message = "Your contact page.";

            return View();
        }
        //[Autorizado(Roles =TipoUsuario.Prestatario)]
        public ActionResult BuscarTurnos()
        {
            return View();
        }

        //
        //GET: PrincipalBusqueda
        public PartialViewResult PrincipalBusqueda()
        {
            return PartialView("_PartialPrincipalBusqueda");
        }
        //
        //GET: BuscarPorFiltrado
        public PartialViewResult BuscarPorFiltrado()
        {
            return PartialView("_PartialBuscarPorFiltrado");
        }
        //
        //GET: BuscarPorGeoposicion
        public PartialViewResult BuscarPorGeoposicion()
        {
            return PartialView("_PartialBuscarPorGeoposicion");
        }
        //[Autorizado(Roles =TipoUsuario.Prestatario)]
        public async System.Threading.Tasks.Task<ActionResult> PerfilEmpresa(string nombreEmpresa)
        {
            var model = new PerfilEmpresaViewModels();
            //using (var client = new HttpClient())
            //{
            //    client.BaseAddress = new Uri("http://localhost:6901");
            //    client.DefaultRequestHeaders.Accept.Clear();
            //    // Agrega el header Accept: application/json para recibir la data como json  
            //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //    // Hace la llamada a http://url-base-del-api/api/products/<id>
            //    var  responseTask = client.GetAsync("api/Empresa?nombre="+nombreEmpresa+"&rubro=&prov=&ciudad=");
            //    responseTask.Wait();
            //    var response = responseTask.Result;
            //    // Si el servicio responde correctamente
            //    if (response.IsSuccessStatusCode)
            //    {
            //        // Lee el response y lo deserializa como un Product
            //        var resultado =  response.Content.ReadAsAsync<IList<VistaFiltroEmpresa>>();
            //        //var oMycustomclassname = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(resultado);
            //        //model.razonSocial = resultado.razonSocial;

            //    }
            //    // Sino devuelve null

            //}

            var req = WebRequest.Create(@"http://localhost:6901/api/Empresa?nombre=" + nombreEmpresa + "&rubro=&prov=&ciudad=");

            //Indicamos el método a utilizar
            req.Method = "GET";
            //Definimos que el contenido del cuerpo del request tiene el formato Json
            req.ContentType = "application/json";

            //Realizamos la llamada a la API de la siguiente forma.
            var resp = req.GetResponse() as HttpWebResponse;

            if (resp != null && resp.StatusCode == HttpStatusCode.OK)
            {
                using (var respStream = resp.GetResponseStream())
                {
                    if (respStream != null)
                    {
                        //Obtenemos de la siguiente el cuerpo de la respuesta
                        var reader = new StreamReader(respStream, Encoding.UTF8);
                        string result = reader.ReadToEnd();

                        //El cuerpo en formato Json lo deserealizamos en el objeto usuario
                        var listResult = JsonConvert.DeserializeObject<List<VistaFiltroEmpresa>>(result);

                        foreach (var emp in listResult)
                        {
                            model.razonSocial = emp.razonSocial;
                        }
                    }
                }
            }
            else
            {
                Console.WriteLine("Status Code: {0}, Status Description: {1}", resp.StatusCode, resp.StatusDescription);

            }


            return View(model);
        }

        public ActionResult PerfilCliente(string nombreCliente)
        {
            var model = new PerfilClienteViewModels() { nombre = nombreCliente };

            return View(model);
        }

        //
        //GET: ComentariosRating
        public PartialViewResult ComentariosRating()
        {
            return PartialView("_PartialComentariosRating");
        }
    }
}