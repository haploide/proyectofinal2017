using System;
using System.Web.Mvc;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Services;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using System.Security.Cryptography.X509Certificates;
using Google.Apis.Auth.OAuth2;
using MimeKit;
using MimeKit.Text;
using System.Text;
using System.Security.Cryptography;
using Google;
using System.IO;
using System.Threading;
using System.Collections.Generic;
using Google.Apis.Util.Store;

namespace WebSite.Controllers
{
    public class EmailController : Controller
    {
        string serviceAccountEmail = string.Empty;

        //X509Certificate2 certificate;

        UserCredential credential;

        GmailService service;
        private string[] Scopes ={ GmailService.Scope.MailGoogleCom, GmailService.Scope.GmailModify, GmailService.Scope.GmailCompose, GmailService.Scope.GmailSend};

        public EmailController()
        {
            inicializarServicio();
        }

        private void inicializarServicio()
        {
            try
            {
                serviceAccountEmail = "geoturnosmail@geoturnos-176422.iam.gserviceaccount.com";
                
                

                //X509Store store = new X509Store(StoreLocation.LocalMachine);

                //store.Open(OpenFlags.ReadOnly);

                //foreach (X509Certificate2 mCert in store.Certificates)
                //{
                //    if (mCert.Thumbprint.Equals("A326B0FB7355B03CCFD61B76CB4A26D2A9F8B6C7"))
                //    {
                //        certificate = mCert; 
                //    }
                //}



                //certificate.Import(@"key.p12", "notasecret", X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet | X509KeyStorageFlags.Exportable);

                //credential = new ServiceAccountCredential(
                //    new ServiceAccountCredential.Initializer(serviceAccountEmail)
                //    {
                //        Scopes = new[] {  GmailService.Scope.MailGoogleCom, GmailService.Scope.GmailModify, GmailService.Scope.GmailCompose, GmailService.Scope.GmailSend  }
                //    }.FromCertificate(certificate));


                using(var stream = new FileStream(@"I:\UTN\PROY\2017\proyectofinal2017\Producto\02 Modulo Web - Codigo Fuente\GeoTurnos\WebSite\resources\GeoTurnos.json", FileMode.Open, FileAccess.Read))
                {
                    string credPath = System.Environment.GetFolderPath(Environment.SpecialFolder.Personal);

                    credPath = Path.Combine(credPath, ".credentials");

                    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(GoogleClientSecrets.Load(stream).Secrets, Scopes, "user", CancellationToken.None, new FileDataStore(credPath, true)).Result;
                }

                service = new GmailService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "GeoTurnos",
                });
            }
            catch (CryptographicException)
            {

                throw new CryptographicException();
            }
            
            catch (Exception)
            {

                throw;
            }

        }

        public Message enviarMail(string to, string from, string subject, string bodyText)
        {
            var email = createEmail(to, from, subject, bodyText);

            var message = createMessageWithEmail(email);

           return SendMessager(service, "geoturnos@gmail.com", message);
        }

        private MimeMessage createEmail(string to, string from, string subject, string bodyText)
        {
            var messager = new MimeMessage();

            messager.To.Add(new MailboxAddress(to));
            messager.From.Add(new MailboxAddress(from));
            messager.Subject = subject;
            messager.Body = new TextPart(TextFormat.Plain) { Text = bodyText };

            return messager;
        }

        private Message createMessageWithEmail(MimeMessage emailContent)
        {
            Message message = new Message() { Raw = Base64UrlEncoder(emailContent.ToString()) };

            return message;
        }

        private Message SendMessager(GmailService service, string userId, Message email)
        {
            try
            {
                return service.Users.Messages.Send(email, userId).Execute();

            }
            catch (GoogleApiException ex)
            {

                throw ex;
            }
            catch (Exception)
            {
                throw new NotImplementedException();

            }

        }
        private static string Base64UrlEncoder(string input)
        {
            var inputBytes = Encoding.UTF8.GetBytes(input);

            return Convert.ToBase64String(inputBytes)
                .Replace('+', '-')
                .Replace('/', '_')
                .Replace("=", "");

        }

    }
}