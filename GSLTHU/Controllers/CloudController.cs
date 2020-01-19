using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
namespace GSLTHU.Controllers
{
    public class CloudController : Controller
    {
        // GET: Cloud
        public ActionResult Index()
        {
            DirectoryInfo d = new DirectoryInfo(Server.MapPath("~/Storage/Files"));
            var c = from a in d.GetFiles() select a.Name;
            ViewBag.names = c;
            return View();
        }
        public ActionResult Upload(HttpPostedFileBase file) {
            try
            {
                var fileName = System.IO.Path.GetFileName(file.FileName);
                    var filePath = Server.MapPath(string.Format("~/{0}/{1}", "Storage", "Files"));
                file.SaveAs(Path.Combine(filePath, fileName));
            }
            catch (Exception)
            {

               
            }
            DirectoryInfo d = new DirectoryInfo(Server.MapPath("~/Storage/Files"));
            var c = from a in d.GetFiles() select a.Name;
            ViewBag.names = c;
           
            return View("Index");
        }  
        public FileStreamResult Download(string fileName)    {
           
            string filePath = Server.MapPath(string.Format("~/{0}/{1}", "Storage/Files", fileName));
            FileStream fs = new FileStream(filePath, FileMode.Open);
            return File(fs, "text/plain", fileName);
        }
    }
}