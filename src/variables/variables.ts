import ben from "../images/avatar-ben.png"
import finn from "../images/avatar-finn.png";
import han from "../images/avatar-han.png";
import leia from "../images/avatar-leia.png";
import luke from "../images/avatar-luke.png";
import poe from "../images/avatar-poe.png";
import rey from "../images/avatar-rey.png";
import yoda from "../images/avatar-yoda.png";
import {
    heartOutline,
    heartSharp,
    logOut,
    logOutOutline,
    mailOutline,
    mailSharp,
    paperPlaneOutline,
    paperPlaneSharp,
  } from "ionicons/icons";

type userType = {
    src: string;
    name: string;
    description_1: string;
    description_2: string;
}
type menuType = {
    title: string,
    url: string,
    iosIcon: string,
    mdIcon: string,
}
export const UserList: userType[] = [
   {
       src:ben,
       name:"Ben",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   },
   {
       src:finn,
       name:"Finn",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   },
   {
       src:han,
       name:"Han",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   },
   {
       src:luke,
       name:"Luke",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   },
   {
       src:poe,
       name:"Poe",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   },
   {
       src:yoda,
       name:"Yoda",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   },
   {
       src:rey,
       name:"Rey",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   },
   {
       src:leia,
       name:"Leia",
       description_1:"lorem ipsum dolor sit amet, consectet",
       description_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
   }   
]

export const menutItems: menuType[] = [
    {
      title: "Inbox",
      url: "/tabs/p/CreateForm",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    },
    {
      title: "Outbox",
      url: "/tabs/p/CreateForm",
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp,
    },
    {
      title: "Favorites",
      url: "/tabs/p/CreateForm",
      iosIcon: heartOutline,
      mdIcon: heartSharp,
    },
    {
      title: "TABS",
      url: "/tabs/p/CreateForm",
      iosIcon: heartOutline,
      mdIcon: heartSharp,
    },
    {
      title:"Log Out",
      url:"/",
      iosIcon:logOutOutline,
      mdIcon: logOut,
    }
  ];