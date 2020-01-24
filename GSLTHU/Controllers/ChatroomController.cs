using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GSLTHU.Controllers
{
    public class ChatroomController : Controller
    {
        //基于ASP.NET MVC SignalR 和 EntityFramework 的即时网页聊天室

        // GET: Chatroom
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Room(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return View("Index");
            }
            ViewBag.RoomId = id;
            return View();
        }
    }
}