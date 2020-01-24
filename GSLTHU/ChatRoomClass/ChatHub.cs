using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;

namespace GSLTHU
{
    public struct User
    {
        public string Uname;
      public string RoomId;
    }

    public static class UserInfo
    {
        //静态储存用户数据
        public static Dictionary<string, User> Users= new Dictionary<string, User>();
    }
    public class ChatHub : Hub
    {

        public void Hello()
        {
            Clients.All.hello();
        }
        public void Send(string name ,string message)
        {
            var val = (from a in UserInfo.Users where a.Value.RoomId == UserInfo.Users[Context.ConnectionId].RoomId select a.Key).ToList();
            Clients.Clients(val).addNewMessageToPage(name, message);
        }
        public override  Task OnDisconnected(bool stopCalled)
        {
            try
            {
                //获取该房间用户列表
                var val = (from a in UserInfo.Users where a.Value.RoomId == UserInfo.Users[Context.ConnectionId].RoomId select a.Key).ToList();
                Clients.Clients(val).addNewMessageToPage(UserInfo.Users[Context.ConnectionId].Uname, "退出了房间");
                string  roomid = UserInfo.Users[Context.ConnectionId].RoomId;
                UserInfo.Users.Remove(Context.ConnectionId);
                
                //更新用户之用户退出
                Clients.Clients(val).updateUsers(UserInfo.Users.Where(a => a.Value.RoomId == roomid).Select(a => a.Value.Uname).ToList());

                return base.OnDisconnected(stopCalled);
            }
            catch (Exception)
            {
                return base.OnDisconnected(stopCalled);

            }
        }
        public void JoinRoom(string roomid,string username)
        {
            
            //加入新用户
           
            UserInfo.Users[Context.ConnectionId] =new User() { Uname= username,RoomId= roomid };
            var val = (from a in UserInfo.Users where a.Value.RoomId == UserInfo.Users[Context.ConnectionId].RoomId select a.Key).ToList();
            //更新用户列表
            Clients.Clients(val).addNewMessageToPage(username, "来到房间");
            Clients.Clients(val).updateUsers(UserInfo.Users.Where(a => a.Value.RoomId == UserInfo.Users[Context.ConnectionId].RoomId).Select(a => a.Value.Uname).ToList());
        }
    }
}