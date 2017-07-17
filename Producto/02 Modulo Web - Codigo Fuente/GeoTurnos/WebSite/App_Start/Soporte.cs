﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSite.Models;

namespace WebSite.App_Start
{
    public enum TipoUsuario
    {
        _Todos,
        Administrador,
        Entidad,
        Prestatario
    }
    public enum EstadoUsuario
    {

    }
    public class UsuarioLogueado
    {
        private string usuario;
        private TipoUsuario tipoUsuario;
        private Empresa empresa;
        private Usuario prestatario;

        public string Usuario{ get; set; }

        public TipoUsuario TipoUsuario { get; set; }

        public Empresa Empresa { get; set; }

        public Usuario Prestatario { get; set; }

        public UsuarioLogueado()
        {

        }
        public UsuarioLogueado(string usuario, TipoUsuario tipoUsuario, Empresa empresa, Usuario prestatario)
        {
            this.usuario = usuario;
            this.tipoUsuario = tipoUsuario;
            this.empresa = empresa;
            this.prestatario = prestatario;
        }
    }

    public class AutorizarAttribute : AuthorizeAttribute
    {
        public new TipoUsuario Roles { get; set; }
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if ((httpContext.Session["usuarioLogin"] == null)|| !(httpContext.Session["usuarioLogin"] is UsuarioLogueado))
            {
                return false;
            }
            else
            {
                if (Roles == TipoUsuario._Todos)
                {
                    return true;
                }
                else
                {
                    UsuarioLogueado usuarioLogin = httpContext.Session["usuarioLogin"] as UsuarioLogueado;

                    if(Roles== usuarioLogin.TipoUsuario)
                    {
                        return true;
                    }
                }
            }
            return false;
            
            
        }
    }
}