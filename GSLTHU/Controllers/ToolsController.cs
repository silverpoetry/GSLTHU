using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace GSLTHU.Controllers
{
    public class ToolsController : Controller
    {

      //  private codepoetryEntities db = new codepoetryEntities();
        // GET: Tools
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetMovie(int? id)
        {
            //LikeSet l = db.LikeSet.Where(a => a.Name == "movie访问数").Single();
          //  l.Count += 1;
           //// db.Entry(l).State = System.Data.EntityState.Modified;
       
           // db.SaveChanges();
            if (id == 1)
            {
                Response.Cookies["userName"].Value = "wsy";

            }
            else
            {
                Response.Cookies["userName"].Value = "tempuser";
            }
            Response.Cookies["userName"].Expires = DateTime.Now.AddDays(100);
            if (Request.Cookies["userName"] != null)
            {
                ViewBag.name = Request.Cookies["userName"].Value;

            }
            return View();
        }
        public ActionResult SQ()
        {

            return View();

        }
        [HttpPost]
        public int SQ(int id)
        {
            bool isw = false;
            if (Request.Cookies["userName"] != null)
            {

                string s = Request.Cookies["userName"].Value;
                if (s == "wsy")
                {
                    isw = true;
                }

            }
            if (id == 0)
            {
                //是
                //if (isw)
                //{
                //    LikeSet l = db.LikeSet.Where(a => a.Name == "wsyYes").Single();
                //    l.Count += 1;
                //    db.Entry(l).State = System.Data.EntityState.Modified;
                //}
                //else
                //{
                //    LikeSet l = db.LikeSet.Where(a => a.Name == "TmpYes").Single();
                //    l.Count += 1;
                //    db.Entry(l).State = System.Data.EntityState.Modified;
                //}
            }
            else
            {//否
                //if (isw)
                //{
                //    LikeSet l = db.LikeSet.Where(a => a.Name == "wsyNo").Single();
                //    l.Count += 1;
                //    db.Entry(l).State = System.Data.EntityState.Modified;
                //}
                //else
                //{
                //    LikeSet l = db.LikeSet.Where(a => a.Name == "TmpNo").Single();
                //    l.Count += 1;
                //    db.Entry(l).State = System.Data.EntityState.Modified;
                //}
            }
          //  db.SaveChanges();
            return 0;

        }
        public ActionResult Watch(){
      //      ViewBag.List = db.LikeSet.ToList();
            return View(); 
            
            }


    }
}