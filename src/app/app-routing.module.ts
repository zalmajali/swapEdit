import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'homeout',
    loadChildren: () => import('./pages/homeout/homeout.module').then( m => m.HomeoutPageModule)
  },
  {
    path: 'errors',
    loadChildren: () => import('./pages/errors/errors.module').then( m => m.ErrorsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./pages/policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'sitework',
    loadChildren: () => import('./pages/sitework/sitework.module').then( m => m.SiteworkPageModule)
  },
  {
    path: 'activation',
    loadChildren: () => import('./pages/activation/activation.module').then( m => m.ActivationPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgotpasssword',
    loadChildren: () => import('./pages/forgotpasssword/forgotpasssword.module').then( m => m.ForgotpassswordPageModule)
  },{
    path: 'invitations',
    loadChildren: () => import('./pages/invitations/invitations.module').then( m => m.InvitationsPageModule)
  },
  {
    path: 'sendpoint',
    loadChildren: () => import('./pages/sendpoint/sendpoint.module').then( m => m.SendpointPageModule)
  },{
    path: 'archives',
    loadChildren: () => import('./pages/archives/archives.module').then( m => m.ArchivesPageModule)
  },{
    path: 'information',
    loadChildren: () => import('./pages/information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./pages/favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'servicesdetalis',
    loadChildren: () => import('./pages/servicesdetalis/servicesdetalis.module').then( m => m.ServicesdetalisPageModule)
  },
  {
    path: 'sendinvitation',
    loadChildren: () => import('./pages/sendinvitation/sendinvitation.module').then( m => m.SendinvitationPageModule)
  },
  {
    path: 'sendpointuser',
    loadChildren: () => import('./pages/sendpointuser/sendpointuser.module').then( m => m.SendpointuserPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./pages/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'pushnotification',
    loadChildren: () => import('./pages/pushnotification/pushnotification.module').then( m => m.PushnotificationPageModule)
  },
  {
    path: 'mypage',
    loadChildren: () => import('./pages/mypage/mypage.module').then( m => m.MypagePageModule)
  },
  {
    path: 'evaluationuser',
    loadChildren: () => import('./pages/evaluationuser/evaluationuser.module').then( m => m.EvaluationuserPageModule)
  },
  {
    path: 'deleteaccount',
    loadChildren: () => import('./pages/deleteaccount/deleteaccount.module').then( m => m.DeleteaccountPageModule)
  },
  {
    path: 'servicesout',
    loadChildren: () => import('./pages/servicesout/servicesout.module').then( m => m.ServicesoutPageModule)
  },
  {
    path: 'servicesdetalisout',
    loadChildren: () => import('./pages/servicesdetalisout/servicesdetalisout.module').then( m => m.ServicesdetalisoutPageModule)
  },
  {
    path: 'searchout',
    loadChildren: () => import('./pages/searchout/searchout.module').then( m => m.SearchoutPageModule)
  },
  {
    path: 'appnotification',
    loadChildren: () => import('./pages/appnotification/appnotification.module').then( m => m.AppnotificationPageModule)
  },
  {
    path: 'changelang',
    loadChildren: () => import('./pages/changelang/changelang.module').then( m => m.ChangelangPageModule)
  },
  {
    path: 'chargeinformation',
    loadChildren: () => import('./pages/chargeinformation/chargeinformation.module').then( m => m.ChargeinformationPageModule)
  },
  {
    path: 'cardlocations',
    loadChildren: () => import('./pages/cardlocations/cardlocations.module').then( m => m.CardlocationsPageModule)
  },
  {
    path: 'cardmovements',
    loadChildren: () => import('./pages/cardmovements/cardmovements.module').then( m => m.CardmovementsPageModule)
  },
  {
    path: 'rechargeoperation',
    loadChildren: () => import('./pages/rechargeoperation/rechargeoperation.module').then( m => m.RechargeoperationPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./pages/complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'complaintsadd',
    loadChildren: () => import('./pages/complaintsadd/complaintsadd.module').then( m => m.ComplaintsaddPageModule)
  },
  {
    path: 'complaintssuccessfully',
    loadChildren: () => import('./pages/complaintssuccessfully/complaintssuccessfully.module').then( m => m.ComplaintssuccessfullyPageModule)
  },
  {
    path: 'awaitingapproval',
    loadChildren: () => import('./pages/awaitingapproval/awaitingapproval.module').then( m => m.AwaitingapprovalPageModule)
  },
  {
    path: 'usertype',
    loadChildren: () => import('./pages/usertype/usertype.module').then( m => m.UsertypePageModule)
  },
  {
    path: 'noproducts',
    loadChildren: () => import('./pages/noproducts/noproducts.module').then( m => m.NoproductsPageModule)
  },
  {
    path: 'changelangout',
    loadChildren: () => import('./pages/changelangout/changelangout.module').then( m => m.ChangelangoutPageModule)
  },
  {
    path: 'advertisements',
    loadChildren: () => import('./pages/advertisements/advertisements.module').then( m => m.AdvertisementsPageModule)
  },
  {
    path: 'addproducts',
    loadChildren: () => import('./pages/addproducts/addproducts.module').then( m => m.AddproductsPageModule)
  },
  {
    path: 'getcatproorser',
    loadChildren: () => import('./pages/getcatproorser/getcatproorser.module').then( m => m.GetcatproorserPageModule)
  },
  {
    path: 'getsubcatproorser',
    loadChildren: () => import('./pages/getsubcatproorser/getsubcatproorser.module').then( m => m.GetsubcatproorserPageModule)
  },
  {
    path: 'productsadd',
    loadChildren: () => import('./pages/productsadd/productsadd.module').then( m => m.ProductsaddPageModule)
  },
  {
    path: 'productsaddsuccess',
    loadChildren: () => import('./pages/productsaddsuccess/productsaddsuccess.module').then( m => m.ProductsaddsuccessPageModule)
  },
  {
    path: 'productsaddimage',
    loadChildren: () => import('./pages/productsaddimage/productsaddimage.module').then( m => m.ProductsaddimagePageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'editproducts',
    loadChildren: () => import('./pages/editproducts/editproducts.module').then( m => m.EditproductsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
