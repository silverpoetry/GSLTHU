using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GSLTHU.Models;
namespace GSLTHU.Controllers
{
   
    public class HelperController : Controller
    {
        mywebEntities myweb = new mywebEntities();

        // GET: Helper
        public ActionResult Index()
        {
         
            return View();
        }
        public ActionResult Paster(string id,int? deleteid)
        {

           // var data = System.IO.File.ReadLines(Server.MapPath("~/Storage/paster.txt")).ToList();
            
            if (!string.IsNullOrEmpty(id))
            {
                PasteNote p = new PasteNote();
                p.Text = id;

                //内容非空则代表添加内容
                //data.Add(id);
                myweb.PasteNotes.Add(p);
                myweb.SaveChanges();
    
            }
            if(deleteid!=null)
            {
                //删除内容
                PasteNote p = new PasteNote();
                p.Id = (int)deleteid;
                myweb.Entry(p).State = System.Data.Entity.EntityState.Deleted;
                myweb.SaveChanges();
            }
           var dtlst = (from a in myweb.PasteNotes select a).ToList() ;
           // System.IO.File.WriteAllLines(Server.MapPath("~/Storage/paster.txt"),data);
            if (deleteid != null||!string.IsNullOrEmpty(id)) Response.Redirect("~/Helper/Paster");
            return View(dtlst);
        }
     
        public string API_GetPaste()
        {
            var data = System.IO.File.ReadLines(Server.MapPath("~/Storage/paster.txt")).ToList();
            if (data.Count == 0)
                return "";
            return data.Last();
        }
        public ActionResult WantingList(string id,int? deleteid)
        {
            Response.Buffer = true;

        //    ViewBag.Title = id;
            if (string.IsNullOrEmpty(id))
            {
                //加载列表
                List<string> a = new List<string>();
                foreach (var item in new System.IO.DirectoryInfo(Server.MapPath("~/Storage/WantingList")).GetFiles())
                {
                    a.Add(item.Name.Substring(0, item.Name.Length - 4));
                }
                ViewBag.Data = a;
                return View();
            }
            else
            {
                //新建
                if (System.IO.File.Exists(Server.MapPath("~/Storage/WantingList/" + id + ".txt"))) Response.Redirect("~/Helper/WantingList");
                //  var data =System.IO.File.ReadLines(Server.MapPath("~/Storage/WantingList" + id + ".txt")).ToList();
                System.IO.File.WriteAllText(Server.MapPath("~/Storage/WantingList/" + id + ".txt"),"");
                Response.Clear();
                Response.Redirect("~/Helper/List/"+id);
                return Content("");
            }
            

        }
        public  ActionResult List(string id,string addthing,int? deleteid )
        {
            ViewBag.Title = id;
            if (!System.IO.File.Exists(Server.MapPath("~/Storage/WantingList/" + id + ".txt"))) { Response.Redirect("~/Helper/WantingList");return Content(""); };
            var data = System.IO.File.ReadLines(Server.MapPath("~/Storage/WantingList/" + id + ".txt")).ToList();
            ViewBag.Data = data;

            if (!string.IsNullOrEmpty(addthing))
                data.Add(addthing);
            
            if (deleteid != null)
                data.RemoveAt(deleteid.Value);


            System.IO.File.WriteAllLines(Server.MapPath("~/Storage/WantingList/" + id + ".txt"), data);
            if (deleteid != null || !string.IsNullOrEmpty(addthing)) Response.Redirect("~/Helper/List/"+id);
            return View();


        }
    }
}