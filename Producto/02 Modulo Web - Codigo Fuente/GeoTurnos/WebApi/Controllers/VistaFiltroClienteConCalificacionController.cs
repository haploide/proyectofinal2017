using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:6907", headers: "*", methods: "*")]
    public class VistaFiltroClienteConCalificacionController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get(string nombre)
        {
            try
            {
                if (_db.VistaFiltroClienteConCalificacion == null || !_db.VistaFiltroClienteConCalificacion.Any())
                {
                    return NotFound();
                }

                var usuario = _db.VistaFiltroClienteConCalificacion.Where(n => n.usuario.Equals(nombre));

                if (usuario == null)
                {
                    return NotFound();
                }
                return Ok(usuario);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


    }
}
