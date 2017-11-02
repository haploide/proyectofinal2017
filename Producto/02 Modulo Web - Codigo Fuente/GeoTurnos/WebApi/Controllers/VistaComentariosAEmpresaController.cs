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
    public class VistaComentariosAEmpresaController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        public IHttpActionResult Get()
        {
            try
            {
                if (_db.VistaComentariosAEmpresa  == null || !_db.VistaComentariosAEmpresa.Any())
                {
                    return NotFound();
                }
                return Ok(_db.VistaComentariosAEmpresa);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Get(int id)
        {
            IQueryable<VistaComentariosAEmpresa> com = null;
            try
            {
                if (_db.VistaComentariosAEmpresa == null || !_db.VistaComentariosAEmpresa.Any())
                {
                    return NotFound();
                }


                
               com = _db.VistaComentariosAEmpresa.Where(p => p.id_empresa == id);
               


                if (com == null)
                {
                    return NotFound();
                }
                return Ok(com);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


    }
}
