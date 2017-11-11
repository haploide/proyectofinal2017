using System.Web;
using System.Web.Optimization;

namespace WebSite
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.min.js",
                        "~/Scripts/angular-route.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                        "~/Scripts/moment.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.2.1.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/jqwidgest").Include(
                        "~/Scripts/jqxcore.js",
                        "~/Scripts/globalization/globalize.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqwidgests").Include(
                        "~/Scripts/jqxdatetimeinput.js",
                        "~/Scripts/jqxcalendar.js",
                        "~/Scripts/jqxloader.js",
                        "~/Scripts/jqxbuttons.js",
                        "~/Scripts/jqxnotification.js",
                        "~/Scripts/jqxrangeselector.js",
                        "~/Scripts/jqxscrollbar.js",
                        "~/Scripts/jqxdata.js",
                        "~/Scripts/jqxdate.js",
                        "~/Scripts/jqxscheduler.js",
                        "~/Scripts/jqxscheduler.api.js",
                        "~/Scripts/jqxmenu.js",
                        "~/Scripts/jqxtooltip.js",
                        "~/Scripts/jqxwindow.js",
                        "~/Scripts/jqxcheckbox.js",
                        "~/Scripts/jqxlistbox.js",
                        "~/Scripts/jqxdropdownlist.js",
                        "~/Scripts/jqxnumberinput.js",
                        "~/Scripts/jqxradiobutton.js",
                        "~/Scripts/jqxinput.js",
                        "~/Scripts/jqxrating.js",
                        "~/Scripts/jqxdraw.js",
                        "~/Scripts/jqxchart.core.js"

                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/jqwidgescss").Include(
                      "~/Content/jqx.base.css",
                      "~/Content/jqx.bootstrap.css"));
        }

    }
}
