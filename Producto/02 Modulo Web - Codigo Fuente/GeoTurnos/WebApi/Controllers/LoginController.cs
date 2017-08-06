using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class LoginController : ApiController
    {
        private GeoTurnosEntities db = new GeoTurnosEntities();

        public IHttpActionResult Get(string usuario, string password)
        {
            try
            {
                if (string.IsNullOrEmpty(usuario) || string.IsNullOrEmpty(password))
                {
                    return BadRequest();
                }
                if (db.Usuario == null || !db.Usuario.Any())
                {
                    return NotFound();
                }
                var user = db.Usuario.Where(u => u.usuario1 == usuario && u.contraseña == password).First();

                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);

            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
            catch (EntityException)
            {

                return InternalServerError();
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}