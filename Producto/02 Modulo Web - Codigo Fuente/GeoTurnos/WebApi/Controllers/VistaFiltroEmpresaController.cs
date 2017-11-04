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
    public class VistaFiltroEmpresaController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get(string nombre, int? rubro, int? prov, int? ciudad)
        {
            try
            {
                if (_db.VistaFiltroEmpresa == null || !_db.VistaFiltroEmpresa.Any())
                {
                    return NotFound();
                }
                
                var emp = (from e in _db.VistaFiltroEmpresa
                          
                           where 1==1

                           && (nombre != null ? e.razonSocial.ToUpper().Contains(nombre.ToUpper()) : true)
                           && (rubro != null ? e.idRubro == rubro : true)
                           && (ciudad != null ? e.idCiudad == ciudad : true)
                           && (prov != null ? e.idProvincia == prov : true)
                           && ((e.id_direccion  != null) ? e.id_direccion == 1 : true)
                           orderby e.comentario descending
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
        public IHttpActionResult Get(string nombre)
        {
            try
            {
                if (_db.VistaFiltroEmpresa == null || !_db.VistaFiltroEmpresa.Any())
                {
                    return NotFound();
                }

                var emp = _db.VistaFiltroEmpresa.Where(n => n.razonSocial.Equals(nombre));

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

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.VistaFiltroEmpresa == null || !_db.VistaFiltroEmpresa.Any())
                {
                    return NotFound();
                }

                var emp = _db.VistaFiltroEmpresa;

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
