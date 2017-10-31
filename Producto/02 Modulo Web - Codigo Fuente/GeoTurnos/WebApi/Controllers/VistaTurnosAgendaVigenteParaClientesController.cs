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
    public class VistaTurnosAgendaVigenteParaClientesController : ApiController
    {

        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get(int id)
        {
            try
            {
                if (_db.VistaTurnosAgendaVigenteParaClientes == null || !_db.VistaTurnosAgendaVigenteParaClientes.Any())
                {
                    return NotFound();
                }

                var resultado = _db.VistaTurnosAgendaVigenteParaClientes.Where(p => p.idEmpresa == id);
                if (resultado == null)
                {
                    return NotFound();
                }

                return Ok(resultado);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
