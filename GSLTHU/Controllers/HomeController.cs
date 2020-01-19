



using System;




using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace GSLTHU.Controllers
{
    public class HomeController : Controller
    {

      
      public ActionResult Index(int id=0)
        {
        
            List<string> a = new List<string>();
            foreach (var item in new System.IO.DirectoryInfo(Server.MapPath("~/Pages")).GetFiles())
            {
                a.Add(item.Name.Substring(0,item.Name.Length-4));
                string t = HttpUtility.UrlEncode(a[a.Count() - 1]);
            }
            ViewBag.Filelist = a;
            if (id==1)
            {
                return PartialView();
            }
            else
            {
                if (Session["first"] == null)
                {
                    Session["first"] = "true";
                    return View("YibuIndex");

                }
                return View();
            }
        }

        public ActionResult About()
        {
            ViewBag.Message = "这个网站很独特";
            if (Request.Cookies["userName"] != null)
            {
                ViewBag.Name = Request.Cookies["userName"].Value;
         
            }
         
            return View();
        }
        public ActionResult DaoJiShi()
        {
            return View();

        }
        public ActionResult Contact()
        {
            ViewBag.Message = "通过以下方式联系我";

            return View();
        }
        public ActionResult Bird(string id ="刘颖润") {
            ViewBag.Id = id;
            return View();
        }

        public ActionResult Toupiao(int? island) {
        //    if (island!=null)
        //    {
        //        Toupiao t = new Data.Toupiao();
        //        t.IfIsland = island == 1 ? true : false;
        //        db.Entry(t).State = System.Data.EntityState.Added;
        //        db.SaveChanges();
               
        //    }
           
        //    ViewBag.All = db.Toupiao.Count();
        //    ViewBag.Island = db.Toupiao.Where(a => a.IfIsland == true).Count();
           return View();

        }

        public ActionResult Page(string id )
        {
            if (string.IsNullOrEmpty(id)) return  View("Home");
           else
            {
                ViewBag.Title = id;
                ViewBag.Content = System.IO.File.ReadAllText(Server.MapPath("~/Pages/" + HttpUtility.UrlDecode( id) + ".htm"));
                return View();
            }
        }
    }
}