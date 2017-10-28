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
    public class VistaParametrosAgendaEmpresaController : ApiController
    {

        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get(int id)//Obtener id del Rubro
        {
            try
            {
                if (_db.VistaParametrosAgendaEmpresa == null || !_db.VistaParametrosAgendaEmpresa.Any())
                {
                    return NotFound();
                }
                var parametros = _db.VistaParametrosAgendaEmpresa.Where(p => p.id_empresa == id);
                if (parametros == null)
                {
                    return NotFound();
                }
                return Ok(parametros);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


    }
}
