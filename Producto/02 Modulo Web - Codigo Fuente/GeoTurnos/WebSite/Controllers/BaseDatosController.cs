using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSite.App_Start;
using WebSite.Models;

namespace WebSite.Controllers
{
    public class BaseDatosController : Controller
    {
        public static bool GuardarEmpresa(Empresa empresa)
        {
            bool resutl = true;
            using (GeoTurnosEntities db = new GeoTurnosEntities())
            {

                try
                {
                    
                    if (empresa != null && db.Empresa != null)
                    {
                        if (empresa.idEmpresa != 0)
                        {
                            db.Entry(empresa).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            db.Empresa.Add(empresa);
                        }
                        db.SaveChanges();

                    }
                    else
                    {
                        resutl = false;
                    }


                }
                catch (EntityException)
                {

                    throw new EntityException();
                }
                catch (Exception)
                {

                    throw new NotImplementedException();

                }
            }
            return resutl;
        }
        public static bool GuardarCliente(Cliente cliente)
        {
            bool resutl = true;
            using (GeoTurnosEntities db = new GeoTurnosEntities())
            {

                try
                {
                    
                    if (cliente != null && db.Cliente != null)
                    {
                        if (cliente.idCliente != 0)
                        {
                            db.Entry(cliente).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            db.Cliente.Add(cliente);
                        }
                        db.SaveChanges();

                    }
                    else
                    {
                        resutl = false;
                    }


                }
                catch (EntityException)
                {

                    throw new EntityException();
                }
                catch (Exception)
                {

                    throw new NotImplementedException();

                }
            }
            return resutl;
        }
        public static UsuarioLogueado Login(string usuario, string password)
        {
            UsuarioLogueado usuariologuado = null;

            using (GeoTurnosEntities db = new GeoTurnosEntities())
            {
                try
                {
                    
                    if (!string.IsNullOrEmpty(usuario) && !string.IsNullOrEmpty(password) && db.Usuario != null && db.Usuario.Any())
                    {
                        Usuario user = db.Usuario.Where(u => u.usuario1 == usuario).First();

                        if (user.contraseña == password)
                        {
                            if (user.Empresa.Count == 1)
                            {
                                Empresa emp = new Empresa(){logoEmpresa = user.Empresa.First().logoEmpresa, idEmpresa= user.Empresa.First().idEmpresa};

                                usuariologuado = new UsuarioLogueado() { Empresa = emp, TipoUsuario = TipoUsuario.Entidad, Usuario = user.usuario1 };
                            }
                            else if (user.Cliente.Count == 1)
                            {
                                Cliente cli = new Cliente() { foto=user.Cliente.First().foto, idCliente= user.Cliente.First().idCliente };
                                usuariologuado = new UsuarioLogueado() { Prestatario = cli , TipoUsuario = TipoUsuario.Prestatario, Usuario = user.usuario1 };
                            }
                            else
                            {
                                usuariologuado = new UsuarioLogueado() { TipoUsuario = TipoUsuario.Administrador, Usuario = user.usuario1 };
                            }

                        }

                    }


                }
                catch (InvalidOperationException)
                {

                    return null;
                }
                catch (EntityException)
                {

                    throw new EntityException();
                }
                catch (Exception)
                {

                    throw new NotImplementedException();
                }



            }

            return usuariologuado;

        }
        public static bool esUsuarioByEmail(string email)
        {
            bool result = false;

            using (GeoTurnosEntities db = new GeoTurnosEntities())
            {
                try
                {
                    if (!string.IsNullOrEmpty(email) && db.Empresa != null && db.Empresa.Any())
                    {
                        var user = db.Empresa.Where(u => u.email == email);

                        if (user.Count() != 0)
                        {
                            result = true;
                        }
                    }
                    if (!string.IsNullOrEmpty(email) && db.Cliente != null && db.Cliente.Any())
                    {
                        var user = db.Cliente.Where(u => u.email == email);

                        if (user.Count() != 0)
                        {
                            result = true;
                        }
                    }
                }
                catch (EntityException)
                {

                    throw new EntityException();
                }
                catch (Exception)
                {
                    throw new NotImplementedException();
                }

            }

            return result;

        }
        public static bool esUsuarioByUsuario(string usuario)
        {
            bool result = false;

            using (GeoTurnosEntities db = new GeoTurnosEntities())
            {
                try
                {
                    if (!string.IsNullOrEmpty(usuario) && db.Usuario != null && db.Usuario.Any())
                    {
                        var user = db.Usuario.Where(u => u.usuario1 == usuario);

                        if (user.Count() != 0)
                        {
                            result = true;
                        }
                    }
                }
                catch (EntityException)
                {

                    throw new EntityException();
                }
                catch (Exception)
                {
                    throw new NotImplementedException();
                }

            }


            return result;

        }


    }
}