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
    public class EmpresaController : ApiController
    {
        private GeoTurnosEntities _db = new GeoTurnosEntities();

        // metodo GET para recuperar un recurso
        public IHttpActionResult Get()
        {
            try
            {
                if (_db.Empresa == null || !_db.Empresa.Any())
                {
                    return NotFound();
                }
                return Ok(_db.Empresa);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Get(int idEst)
        {
            try
            {
                if (_db.Empresa == null || !_db.Empresa.Any())
                {
                    return NotFound();
                }
                var emp = _db.Empresa.Where(p => p.idEstado == idEst);
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

        
        public IHttpActionResult Get(string nombre, int? rubro, int? prov, int? ciudad)
        {
            try
            {
                if (_db.Empresa == null || !_db.Empresa.Any())
                {
                    return NotFound();
                }

                //var emp = _db.Empresa.Where(e => e.Estado.idEstado == 1);
                Double prom = 0;
                var emp = (from e in _db.Empresa
                           join r in _db.Rubro on e.Rubro.idRubro equals r.idRubro
                           join d in _db.Domicilio on e.idDomicilio equals d.idDomicilio
                           join b in _db.Barrio on d.idBarrio equals b.idBarrio
                           join c in _db.Ciudad on b.idCiudad equals c.idCiudad
                           join p in _db.Provincia on c.idProvincia equals p.idProvincia
                           join com in _db.Comentarios on e.idEmpresa equals  com.id_empresa into comEmpresa
                           from CE in comEmpresa.DefaultIfEmpty()
                           
                           where e.idEstado == 1

                           && (nombre!=null?e.razonSocial.ToUpper().Contains(nombre.ToUpper()):true)
                           && (rubro!=null?r.idRubro == rubro:true)
                           && (ciudad !=null? c.idCiudad == ciudad:true)
                           &&(prov!=null?p.idProvincia == prov:true)
                           &&((CE!= null )? CE.id_direccion == 1:true)
                          
                           select new 
                           {
                               e,
                               CE
                               //prom 
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




        // metrodo POST para crear un recurso nuevo

        public IHttpActionResult Post([FromBody]Empresa empresa)
        {
            try
            {
                if (_db.Empresa == null || !_db.Empresa.Any())
                {
                    return NotFound();
                }
                if (empresa == null)
                {
                    return BadRequest();
                }

                _db.Empresa.Add(empresa);

                _db.SaveChanges();

                return Created("api/Empresa/" + empresa.idEmpresa, empresa);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Delete(int id)
        {
            try
            {
                var empr = _db.Empresa.Find(id);

                if (empr == null)
                {
                    return NotFound();
                }
                _db.Empresa.Remove(empr);

                _db.SaveChanges();

                return Ok(empr);

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Put(int id, [FromBody]Empresa emrpesa)
        {
            try
            {
                if (emrpesa == null)
                {
                    return BadRequest();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != emrpesa.idEmpresa)
                {
                    return BadRequest();
                }
                if (_db.Empresa.Count(e => e.idEmpresa == id) == 0)
                {
                    return NotFound();
                }
                _db.Entry(emrpesa).State = System.Data.Entity.EntityState.Modified;

                _db.SaveChanges();

                return Ok(emrpesa);


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
