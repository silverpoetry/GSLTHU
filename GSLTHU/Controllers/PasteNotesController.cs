using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GSLTHU.Models;

namespace GSLTHU.Controllers
{
    public class PasteNotesController : Controller
    {
        private mywebEntities db = new mywebEntities();

        // GET: PasteNotes
        public ActionResult Index()
        {
            return View(db.PasteNoteSet.ToList());
           
        }

        // GET: PasteNotes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PasteNote pasteNote = db.PasteNoteSet.Find(id);
            if (pasteNote == null)
            {
                return HttpNotFound();
            }
            return View(pasteNote);
        }

        // GET: PasteNotes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PasteNotes/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性，有关 
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Text")] PasteNote pasteNote)
        {
            if (ModelState.IsValid)
            {
                db.PasteNoteSet.Add(pasteNote);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(pasteNote);
        }

        // GET: PasteNotes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PasteNote pasteNote = db.PasteNoteSet.Find(id);
            if (pasteNote == null)
            {
                return HttpNotFound();
            }
            return View(pasteNote);
        }

        // POST: PasteNotes/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性，有关 
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Text")] PasteNote pasteNote)
        {
            if (ModelState.IsValid)
            {
                db.Entry(pasteNote).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(pasteNote);
        }

        // GET: PasteNotes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PasteNote pasteNote = db.PasteNoteSet.Find(id);
            if (pasteNote == null)
            {
                return HttpNotFound();
            }
            return View(pasteNote);
        }

        // POST: PasteNotes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PasteNote pasteNote = db.PasteNoteSet.Find(id);
            db.PasteNoteSet.Remove(pasteNote);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
