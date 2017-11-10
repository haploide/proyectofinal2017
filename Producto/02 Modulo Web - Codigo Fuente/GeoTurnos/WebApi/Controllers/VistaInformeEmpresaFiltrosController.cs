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
    public class VistaInformeEmpresaFiltrosController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get(DateTime fechaDesde, DateTime fechaHasta, int? rubro, int? prov, int? ciudad)
        {
            try
            {
                if (_db.VistaInformeEmpresaFiltros == null || !_db.VistaInformeEmpresaFiltros.Any())
                {
                    return NotFound();
                }

                var emp = (from e in _db.VistaInformeEmpresaFiltros

                           where 1 == 1

                           && (e.fechaRegistroEmpresa >= fechaDesde  && e.fechaRegistroEmpresa <= fechaHasta  )
                           && (rubro != null ? e.idRubro == rubro : true)
                           && (ciudad != null ? e.idCiudad == ciudad : true)
                           && (prov != null ? e.idProvincia == prov : true)

                           select new
                           {
                               e,

                           });
                if (emp == null)
                {
                    return NotFound();
                }
                return Ok(emp);
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
